import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import {
  NAMESPACE,
  PGBOUNCER_EXPORTER_IMAGE,
  PGBOUNCER_EXPORTER_LABELS,
  PGBOUNCER_EXPORTER_SELECTOR_LABELS,
} from "../prometheus-constants/prometheus-constants.module.code.ts"

export function pgbouncerExporterDeploymentYaml(): string {
  return synthOne(NAMESPACE, "pgbouncer-exporter-deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "pgbouncer-exporter",
      namespace: NAMESPACE,
      labels: PGBOUNCER_EXPORTER_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: PGBOUNCER_EXPORTER_SELECTOR_LABELS },
      template: {
        metadata: { labels: PGBOUNCER_EXPORTER_LABELS },
        spec: {
          containers: [
            {
              name: "pgbouncer-exporter",
              image: PGBOUNCER_EXPORTER_IMAGE,
              env: [
                {
                  name: "PGBOUNCER_EXPORTER_CONNECTION_STRING",
                  valueFrom: {
                    secretKeyRef: { name: "prometheus-secrets", key: "PGBOUNCER_STATS_DSN" },
                  },
                },
              ],
              ports: [{ name: "metrics", containerPort: 9127 }],
              resources: {
                requests: { cpu: "10m", memory: "48Mi" },
                limits: { memory: "48Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 65534,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
                readOnlyRootFilesystem: true,
              },
              livenessProbe: {
                httpGet: { path: "/", port: 9127 },
                initialDelaySeconds: 10,
                periodSeconds: 10,
              },
              readinessProbe: {
                httpGet: { path: "/", port: 9127 },
                initialDelaySeconds: 5,
                periodSeconds: 5,
              },
            },
          ],
        },
      },
    },
  })
}

export function pgbouncerExporterServiceYaml(): string {
  return synthOne(NAMESPACE, "pgbouncer-exporter-service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "pgbouncer-exporter",
      namespace: NAMESPACE,
      labels: PGBOUNCER_EXPORTER_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: PGBOUNCER_EXPORTER_SELECTOR_LABELS,
      ports: [
        {
          name: "metrics",
          port: 9127,
          targetPort: "metrics",
          protocol: "TCP",
        },
      ],
    },
  })
}
