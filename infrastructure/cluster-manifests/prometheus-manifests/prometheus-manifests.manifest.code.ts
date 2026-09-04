import { synthMulti, synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { capabilitySelector, HOSTNAME_KEY } from "@akasha/k8s-types/hostnames"
import { PROMETHEUS_YML } from "../prometheus-config/prometheus-config.module.code.ts"
import {
  ALERTMANAGER_IMAGE,
  BUSYBOX_IMAGE,
  NAMESPACE,
  PROMETHEUS_IMAGE,
  PROMETHEUS_LABELS,
  PROMETHEUS_SELECTOR_LABELS,
} from "../prometheus-constants/prometheus-constants.module.code.ts"

const NO_ALERT_RULES = "groups: []\n"

export async function prometheusConfigmapYaml(): Promise<string> {
  return synthOne(NAMESPACE, "prometheus-configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "prometheus-config",
      namespace: NAMESPACE,
      labels: PROMETHEUS_LABELS,
    },
    data: {
      "prometheus.yml": PROMETHEUS_YML,
      "alerts.yml": NO_ALERT_RULES,
    },
  })
}

export function prometheusRbacYaml(): string {
  return synthMulti(NAMESPACE, [
    {
      id: "prometheus-serviceaccount",
      manifest: {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: {
          name: "prometheus",
          namespace: NAMESPACE,
          labels: PROMETHEUS_LABELS,
        },
      },
    },
    {
      id: "prometheus-clusterrole",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "ClusterRole",
        metadata: {
          name: "prometheus",
          labels: PROMETHEUS_LABELS,
        },
        rules: [
          {
            apiGroups: [""],
            resources: ["nodes", "nodes/proxy", "nodes/metrics", "services", "endpoints", "pods"],
            verbs: ["get", "list", "watch"],
          },
          {
            apiGroups: ["extensions", "networking.k8s.io"],
            resources: ["ingresses"],
            verbs: ["get", "list", "watch"],
          },
          {
            nonResourceURLs: ["/metrics", "/metrics/cadvisor"],
            verbs: ["get"],
          },
        ],
      },
    },
    {
      id: "prometheus-clusterrolebinding",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "ClusterRoleBinding",
        metadata: {
          name: "prometheus",
          labels: PROMETHEUS_LABELS,
        },
        roleRef: {
          apiGroup: "rbac.authorization.k8s.io",
          kind: "ClusterRole",
          name: "prometheus",
        },
        subjects: [
          {
            kind: "ServiceAccount",
            name: "prometheus",
            namespace: NAMESPACE,
          },
        ],
      },
    },
  ])
}

export function prometheusPvYaml(): string {
  return synthOne(NAMESPACE, "prometheus-pv", {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: { name: "prometheus-data", labels: PROMETHEUS_LABELS },
    spec: {
      capacity: { storage: "200Gi" },
      volumeMode: "Filesystem",
      accessModes: ["ReadWriteOnce"],
      persistentVolumeReclaimPolicy: "Retain",
      storageClassName: "",
      hostPath: { path: "/var/lib/prometheus-data", type: "DirectoryOrCreate" },
      claimRef: { namespace: NAMESPACE, name: "prometheus-data" },
      nodeAffinity: {
        required: {
          nodeSelectorTerms: [
            { matchExpressions: [{ key: HOSTNAME_KEY, operator: "In", values: ["node-02"] }] },
          ],
        },
      },
    },
  })
}

export function prometheusPvcYaml(): string {
  return synthOne(NAMESPACE, "prometheus-pvc", {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: "prometheus-data",
      namespace: NAMESPACE,
      labels: PROMETHEUS_LABELS,
    },
    spec: {
      accessModes: ["ReadWriteOnce"],
      storageClassName: "",
      volumeName: "prometheus-data",
      resources: { requests: { storage: "200Gi" } },
    },
  })
}

export function prometheusServiceYaml(): string {
  return synthOne(NAMESPACE, "prometheus-service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "prometheus",
      namespace: NAMESPACE,
      labels: PROMETHEUS_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: PROMETHEUS_SELECTOR_LABELS,
      ports: [
        {
          name: "http",
          port: 9090,
          targetPort: "http",
          protocol: "TCP",
        },
      ],
    },
  })
}

export function prometheusDeploymentYaml(): string {
  return synthOne(NAMESPACE, "prometheus-deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "prometheus",
      namespace: NAMESPACE,
      labels: PROMETHEUS_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: PROMETHEUS_SELECTOR_LABELS },
      template: {
        metadata: { labels: PROMETHEUS_LABELS },
        spec: {
          serviceAccountName: "prometheus",
          nodeSelector: capabilitySelector("database"),
          initContainers: [
            {
              name: "init-chown-data",
              image: BUSYBOX_IMAGE,
              command: ["sh", "-c", "chown -R 65534:65534 /prometheus"],
              volumeMounts: [{ name: "data", mountPath: "/prometheus" }],
              resources: {
                requests: { memory: "64Mi" },
                limits: { memory: "64Mi" },
              },
              securityContext: {
                runAsNonRoot: false,
                runAsUser: 0,
              },
            },
          ],
          containers: [
            {
              name: "prometheus",
              image: PROMETHEUS_IMAGE,
              args: [
                "--config.file=/etc/prometheus/prometheus.yml",
                "--storage.tsdb.path=/prometheus",
                "--storage.tsdb.retention.time=90d",
                "--storage.tsdb.retention.size=200GB",
                "--web.enable-lifecycle",
                "--web.console.libraries=/usr/share/prometheus/console_libraries",
                "--web.console.templates=/usr/share/prometheus/consoles",
                "--enable-feature=promql-experimental-functions",
              ],
              ports: [{ name: "http", containerPort: 9090 }],
              resources: {
                requests: { cpu: "30m", memory: "8Gi" },
                limits: { memory: "8Gi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 65534,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
                readOnlyRootFilesystem: true,
              },
              livenessProbe: {
                httpGet: { path: "/-/healthy", port: 9090 },
                initialDelaySeconds: 60,
                periodSeconds: 15,
              },
              readinessProbe: {
                httpGet: { path: "/-/ready", port: 9090 },
                initialDelaySeconds: 30,
                periodSeconds: 5,
              },
              volumeMounts: [
                {
                  name: "config",
                  mountPath: "/etc/prometheus/prometheus.yml",
                  subPath: "prometheus.yml",
                },
                {
                  name: "config",
                  mountPath: "/etc/prometheus/rules/alerts.yml",
                  subPath: "alerts.yml",
                },
                { name: "data", mountPath: "/prometheus" },
              ],
            },
            {
              name: "alertmanager",
              image: ALERTMANAGER_IMAGE,
              args: [
                "--config.file=/etc/alertmanager/alertmanager.yml",
                "--storage.path=/alertmanager",
                "--log.level=info",
              ],
              ports: [{ name: "alertmanager", containerPort: 9093 }],
              resources: {
                requests: { cpu: "25m", memory: "64Mi" },
                limits: { memory: "64Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 65534,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
                readOnlyRootFilesystem: true,
              },
              volumeMounts: [
                { name: "alertmanager-config", mountPath: "/etc/alertmanager" },
                { name: "alertmanager-data", mountPath: "/alertmanager" },
              ],
            },
          ],
          volumes: [
            { name: "config", configMap: { name: "prometheus-config" } },
            { name: "data", persistentVolumeClaim: { claimName: "prometheus-data" } },
            {
              name: "alertmanager-config",
              secret: { secretName: "alertmanager-config" },
            },
            { name: "alertmanager-data", emptyDir: { sizeLimit: "512Mi" } },
          ],
        },
      },
    },
  })
}
