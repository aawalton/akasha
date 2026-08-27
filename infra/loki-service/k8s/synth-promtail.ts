import { synthMulti, synthOne } from "@infra/k8s-types/cdk8s-synth"
import { PROMTAIL_CONFIG } from "./synth-configs"
import { NAMESPACE, PROMTAIL_LABELS, PROMTAIL_SELECTOR_LABELS } from "./synth-constants"

export function promtailConfigmapYaml(): string {
  return synthOne(NAMESPACE, "promtail-configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "promtail-config",
      namespace: NAMESPACE,
      labels: PROMTAIL_LABELS,
    },
    data: {
      "promtail.yaml": PROMTAIL_CONFIG,
    },
  })
}

export function promtailRbacYaml(): string {
  return synthMulti("promtail-rbac", [
    {
      id: "promtail-serviceaccount",
      manifest: {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: {
          name: "promtail",
          namespace: NAMESPACE,
          labels: PROMTAIL_LABELS,
        },
      },
    },
    {
      id: "promtail-clusterrole",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "ClusterRole",
        metadata: {
          name: "promtail",
          labels: PROMTAIL_LABELS,
        },
        rules: [
          {
            apiGroups: [""],
            resources: ["nodes", "namespaces", "pods"],
            verbs: ["get", "list", "watch"],
          },
        ],
      },
    },
    {
      id: "promtail-clusterrolebinding",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "ClusterRoleBinding",
        metadata: {
          name: "promtail",
          labels: PROMTAIL_LABELS,
        },
        roleRef: {
          apiGroup: "rbac.authorization.k8s.io",
          kind: "ClusterRole",
          name: "promtail",
        },
        subjects: [
          {
            kind: "ServiceAccount",
            name: "promtail",
            namespace: NAMESPACE,
          },
        ],
      },
    },
  ])
}

export function promtailDaemonsetYaml(): string {
  return synthOne(NAMESPACE, "promtail-daemonset", {
    apiVersion: "apps/v1",
    kind: "DaemonSet",
    metadata: {
      name: "promtail",
      namespace: NAMESPACE,
      labels: PROMTAIL_LABELS,
    },
    spec: {
      selector: { matchLabels: PROMTAIL_SELECTOR_LABELS },
      template: {
        metadata: {
          labels: PROMTAIL_LABELS,
          annotations: { "checksum/config": "placeholder" },
        },
        spec: {
          serviceAccountName: "promtail",
          tolerations: [{ effect: "NoSchedule", operator: "Exists" }],
          containers: [
            {
              name: "promtail",
              image: "grafana/promtail:3.1.0",
              args: ["-config.file=/etc/promtail/promtail.yaml"],
              env: [
                {
                  name: "HOSTNAME",
                  valueFrom: { fieldRef: { fieldPath: "spec.nodeName" } },
                },
              ],
              ports: [{ name: "http", containerPort: 3101 }],
              resources: {
                requests: { cpu: "15m", memory: "512Mi" },
                limits: { memory: "512Mi" },
              },
              securityContext: {
                runAsUser: 0,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: {
                  drop: ["ALL"],
                  add: ["DAC_READ_SEARCH"],
                },
              },
              readinessProbe: {
                httpGet: { path: "/ready", port: 3101 },
                initialDelaySeconds: 10,
                periodSeconds: 10,
              },
              volumeMounts: [
                { name: "config", mountPath: "/etc/promtail" },
                { name: "run", mountPath: "/var/lib/promtail" },
                { name: "pods", mountPath: "/var/log/pods", readOnly: true },
                { name: "hostlog", mountPath: "/host/var/log", readOnly: true },
              ],
            },
          ],
          volumes: [
            { name: "config", configMap: { name: "promtail-config" } },
            {
              name: "run",
              hostPath: { path: "/var/lib/promtail", type: "DirectoryOrCreate" },
            },
            { name: "pods", hostPath: { path: "/var/log/pods", type: "Directory" } },
            { name: "hostlog", hostPath: { path: "/var/log", type: "Directory" } },
          ],
        },
      },
    },
  })
}
