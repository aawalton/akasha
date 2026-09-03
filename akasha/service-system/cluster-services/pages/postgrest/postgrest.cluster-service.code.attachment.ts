import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import {
  CNPG_POSTGRES_PRIMARY_LABELS,
  colocationAffinityPreferred,
} from "@akasha/k8s-types/hostnames"

const NAMESPACE = "postgrest"
const APP_NAME = "postgrest"
const INSTANCE_NAME = "postgrest"
const COMPONENT = "api"
const PART_OF = "postgrest"
const MANAGED_BY = "bootstrap"
const POSTGREST_IMAGE = "postgrest/postgrest:v12.2.3"

const RESOURCE_LABELS = {
  app: APP_NAME,
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": COMPONENT,
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const SELECTOR_LABELS = {
  app: APP_NAME,
} as const

const NAMESPACE_LABELS = {
  "kubernetes.io/metadata.name": NAMESPACE,
} as const

function namespaceYaml(): string {
  return synthOne(NAMESPACE, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: {
      name: NAMESPACE,
      labels: NAMESPACE_LABELS,
    },
  })
}

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "postgrest",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: 2,
      strategy: {
        type: "RollingUpdate",
        rollingUpdate: {
          maxSurge: 1,
          maxUnavailable: 1,
        },
      },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: {
          labels: RESOURCE_LABELS,
          annotations: {
            "checksum/postgrest-secrets": "placeholder",
          },
        },
        spec: {
          affinity: colocationAffinityPreferred(CNPG_POSTGRES_PRIMARY_LABELS, ["postgres"]),
          containers: [
            {
              name: "postgrest",
              image: POSTGREST_IMAGE,
              imagePullPolicy: "IfNotPresent",
              ports: [{ containerPort: 3000, protocol: "TCP" }],
              env: [
                {
                  name: "DATABASE_URL",
                  valueFrom: {
                    secretKeyRef: { name: "postgrest-secrets", key: "DATABASE_URL" },
                  },
                },
                {
                  name: "PGRST_DB_URI",
                  valueFrom: {
                    secretKeyRef: { name: "postgrest-secrets", key: "DATABASE_URL" },
                  },
                },
                {
                  name: "PGRST_JWT_SECRET",
                  valueFrom: {
                    secretKeyRef: { name: "postgrest-secrets", key: "PGRST_JWT_SECRET" },
                  },
                },
                { name: "PGRST_DB_SCHEMAS", value: "public" },
                { name: "PGRST_DB_ANON_ROLE", value: "anon" },
                { name: "PGRST_DB_USE_LEGACY_GUCS", value: "false" },
                {
                  name: "PGRST_SERVER_PROXY_URI",
                  value: "https://supabase.alanwalton.com/rest/v1",
                },
                { name: "PGRST_DB_POOL", value: "50" },
                { name: "PGRST_DB_POOL_ACQUISITION_TIMEOUT", value: "10" },
                { name: "PGRST_SERVER_PORT", value: "3000" },
              ],
              resources: {
                requests: { cpu: "50m", memory: "4Gi" },
                limits: { memory: "4Gi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              readinessProbe: {
                httpGet: { path: "/", port: 3000 },
                initialDelaySeconds: 5,
                periodSeconds: 10,
              },
              livenessProbe: {
                tcpSocket: { port: 3000 },
                initialDelaySeconds: 20,
                periodSeconds: 30,
              },
            },
          ],
        },
      },
    },
  })
}

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "postgrest",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [
        {
          name: "http",
          port: 3000,
          targetPort: 3000,
          protocol: "TCP",
        },
      ],
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
