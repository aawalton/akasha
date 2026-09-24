import {
  synthMulti,
  synthOne,
} from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { configChecksum } from "akasha/infrastructure/cluster/k8s-type/modules/config-checksum/config-checksum.module.code.ts"
import { resourcesOf } from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import { PROMTAIL_CONFIG } from "akasha/infrastructure/loki-service/modules/loki-configs/loki-configs.module.code.ts"
import {
  NAMESPACE,
  PROMTAIL_LABELS,
  PROMTAIL_SELECTOR_LABELS,
} from "akasha/infrastructure/loki-service/modules/loki-constants/loki-constants.module.code.ts"
import { promtail as page } from "akasha/infrastructure/loki-service/promtail/promtail.manifest.ts"
import { promtail } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/promtail/promtail.service-cluster.ts"

const CONFIG_DATA = {
  "promtail.yaml": PROMTAIL_CONFIG,
} as const

export function promtailConfigmapYaml(): string {
  return synthOne(NAMESPACE, "promtail-configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "promtail-config",
      namespace: NAMESPACE,
      labels: PROMTAIL_LABELS,
    },
    data: CONFIG_DATA,
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
    kind: promtail.resourceKind,
    metadata: {
      name: promtail.resourceName,
      namespace: promtail.namespace,
      labels: PROMTAIL_LABELS,
    },
    spec: {
      selector: { matchLabels: PROMTAIL_SELECTOR_LABELS },
      template: {
        metadata: {
          labels: PROMTAIL_LABELS,
          annotations: { "checksum/config": configChecksum(CONFIG_DATA) },
        },
        spec: {
          serviceAccountName: "promtail",
          tolerations: [{ effect: "NoSchedule", operator: "Exists" }],
          containers: [
            {
              name: "promtail",
              image: promtail.image,
              args: ["-config.file=/etc/promtail/promtail.yaml"],
              env: [
                {
                  name: "HOSTNAME",
                  valueFrom: { fieldRef: { fieldPath: "spec.nodeName" } },
                },
              ],
              ports: [{ name: "http", containerPort: promtail.containerPort }],
              resources: resourcesOf(page),
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
                httpGet: { path: "/ready", port: promtail.containerPort },
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
