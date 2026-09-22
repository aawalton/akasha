import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { configChecksum } from "akasha/infrastructure/cluster/k8s-type/modules/config-checksum/config-checksum.module.code.ts"
import {
  capabilitySelector,
  HOSTNAME_KEY,
} from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { LOKI_CONFIG } from "akasha/infrastructure/loki-service/modules/loki-configs/loki-configs.module.code.ts"
import {
  DATA_CAPACITY,
  DATA_HOST_PATH,
  DATA_NODE,
  LOKI_LABELS,
  LOKI_SELECTOR_LABELS,
  NAMESPACE,
  NAMESPACE_LABELS,
} from "akasha/infrastructure/loki-service/modules/loki-constants/loki-constants.module.code.ts"

const CONFIG_DATA = {
  "loki.yaml": LOKI_CONFIG,
} as const

const DATA_CLAIM = "loki-data"

export function namespaceYaml(): string {
  return synthOne(NAMESPACE, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: {
      name: NAMESPACE,
      labels: NAMESPACE_LABELS,
    },
  })
}

export function configmapYaml(): string {
  return synthOne(NAMESPACE, "configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: "loki-config",
      namespace: NAMESPACE,
      labels: LOKI_LABELS,
    },
    data: CONFIG_DATA,
  })
}

export function dataPvYaml(): string {
  return synthOne(NAMESPACE, "data-pv", {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: { name: DATA_CLAIM, labels: LOKI_LABELS },
    spec: {
      capacity: { storage: DATA_CAPACITY },
      volumeMode: "Filesystem",
      accessModes: ["ReadWriteOnce"],
      persistentVolumeReclaimPolicy: "Retain",
      storageClassName: "",
      hostPath: { path: DATA_HOST_PATH, type: "DirectoryOrCreate" },
      claimRef: { namespace: NAMESPACE, name: DATA_CLAIM },
      nodeAffinity: {
        required: {
          nodeSelectorTerms: [
            { matchExpressions: [{ key: HOSTNAME_KEY, operator: "In", values: [DATA_NODE] }] },
          ],
        },
      },
    },
  })
}

export function dataPvcYaml(): string {
  return synthOne(NAMESPACE, "data-pvc", {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: DATA_CLAIM,
      namespace: NAMESPACE,
      labels: LOKI_LABELS,
    },
    spec: {
      accessModes: ["ReadWriteOnce"],
      storageClassName: "",
      volumeName: DATA_CLAIM,
      resources: { requests: { storage: DATA_CAPACITY } },
    },
  })
}

export function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "loki",
      namespace: NAMESPACE,
      labels: LOKI_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: LOKI_SELECTOR_LABELS },
      template: {
        metadata: {
          annotations: {
            "checksum/config": configChecksum(CONFIG_DATA),
          },
          labels: LOKI_LABELS,
        },
        spec: {
          nodeSelector: capabilitySelector("database"),
          initContainers: [
            {
              name: "init-chown-data",
              image: "busybox:1.36",
              command: ["sh", "-c", "chown -R 10001:10001 /loki"],
              volumeMounts: [{ name: "data", mountPath: "/loki" }],
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
              name: "loki",
              image: "grafana/loki:3.1.0",
              args: ["-config.file=/etc/loki/loki.yaml", "-config.expand-env=true", "-target=all"],
              ports: [{ name: "http", containerPort: 3100 }],
              resources: {
                requests: { cpu: "15m", memory: "2Gi" },
                limits: { memory: "2Gi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 10001,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
                readOnlyRootFilesystem: true,
              },
              readinessProbe: {
                httpGet: { path: "/ready", port: 3100 },
                initialDelaySeconds: 15,
                periodSeconds: 10,
              },
              livenessProbe: {
                httpGet: { path: "/ready", port: 3100 },
                initialDelaySeconds: 60,
                periodSeconds: 15,
                failureThreshold: 5,
              },
              volumeMounts: [
                { name: "config", mountPath: "/etc/loki" },
                { name: "data", mountPath: "/loki" },
                { name: "tmp", mountPath: "/tmp" },
              ],
            },
          ],
          volumes: [
            { name: "config", configMap: { name: "loki-config" } },
            { name: "data", persistentVolumeClaim: { claimName: DATA_CLAIM } },
            { name: "tmp", emptyDir: { sizeLimit: "256Mi" } },
          ],
        },
      },
    },
  })
}

export function serviceYaml(): string {
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "loki",
      namespace: NAMESPACE,
      labels: LOKI_LABELS,
    },
    spec: {
      type: "ClusterIP",
      ports: [{ name: "http", port: 3100, targetPort: 3100 }],
      selector: LOKI_SELECTOR_LABELS,
    },
  })
}
