import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { capabilitySelector } from "@akasha/k8s-types/hostnames"
import { LOKI_CONFIG } from "../loki-configs/loki-configs.module.code.ts"
import {
  LOKI_LABELS,
  LOKI_SELECTOR_LABELS,
  NAMESPACE,
  NAMESPACE_LABELS,
  S3_SECRET_NAME,
} from "../loki-constants/loki-constants.module.code.ts"

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
    data: {
      "loki.yaml": LOKI_CONFIG,
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
            "checksum/config": "placeholder",
            "checksum/s3-creds": "placeholder",
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
              env: [
                {
                  name: "LOKI_S3_ACCESS_KEY",
                  valueFrom: { secretKeyRef: { name: S3_SECRET_NAME, key: "access_key" } },
                },
                {
                  name: "LOKI_S3_SECRET_KEY",
                  valueFrom: { secretKeyRef: { name: S3_SECRET_NAME, key: "secret_key" } },
                },
              ],
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
            { name: "data", emptyDir: { sizeLimit: "4Gi" } },
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
