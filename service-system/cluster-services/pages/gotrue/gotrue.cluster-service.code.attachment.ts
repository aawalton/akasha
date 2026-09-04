import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import {
  CNPG_POSTGRES_PRIMARY_LABELS,
  colocationAffinityPreferred,
} from "@akasha/k8s-types/hostnames"

const NAMESPACE = "gotrue"
const APP_NAME = "gotrue"
const INSTANCE_NAME = "gotrue"
const COMPONENT = "auth"
const PART_OF = "gotrue"
const MANAGED_BY = "bootstrap"
const GOTRUE_IMAGE = "supabase/auth:v2.188.1"
const HTTP_PORT = 9999

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

const COMMAND_SCRIPT = ['export GOTRUE_DB_DATABASE_URL="$DATABASE_URL"', "exec auth", ""].join("\n")

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

function serviceYaml(): string {
  return synthOne(NAMESPACE, "gotrue-service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "gotrue",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [
        {
          name: "http",
          port: HTTP_PORT,
          targetPort: HTTP_PORT,
          protocol: "TCP",
        },
      ],
    },
  })
}

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "gotrue-deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "gotrue",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: {
        type: "RollingUpdate",
        rollingUpdate: {
          maxSurge: 1,
          maxUnavailable: 0,
        },
      },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: { labels: RESOURCE_LABELS },
        spec: {
          affinity: colocationAffinityPreferred(CNPG_POSTGRES_PRIMARY_LABELS, ["postgres"]),
          containers: [
            {
              name: "gotrue",
              image: GOTRUE_IMAGE,
              imagePullPolicy: "IfNotPresent",
              command: ["/bin/sh", "-c", COMMAND_SCRIPT],
              ports: [
                {
                  containerPort: HTTP_PORT,
                  protocol: "TCP",
                },
              ],
              env: [
                { name: "GOTRUE_API_HOST", value: "0.0.0.0" },
                { name: "GOTRUE_API_PORT", value: "9999" },
                {
                  name: "GOTRUE_API_EXTERNAL_URL",
                  value: "https://supabase.alanwalton.com",
                },
                {
                  name: "API_EXTERNAL_URL",
                  value: "https://supabase.alanwalton.com",
                },
                { name: "GOTRUE_DB_DRIVER", value: "postgres" },
                {
                  name: "DATABASE_URL",
                  valueFrom: {
                    secretKeyRef: {
                      name: "gotrue-secrets",
                      key: "DATABASE_URL",
                    },
                  },
                },
                {
                  name: "GOTRUE_JWT_KEYS",
                  valueFrom: {
                    secretKeyRef: {
                      name: "gotrue-secrets",
                      key: "GOTRUE_JWT_KEYS",
                    },
                  },
                },
                {
                  name: "GOTRUE_JWT_SECRET",
                  value: "unused-rs256-signing-via-jwt-keys",
                },
                { name: "GOTRUE_JWT_AUD", value: "authenticated" },
                { name: "GOTRUE_JWT_EXP", value: "3600" },
                { name: "GOTRUE_JWT_ADMIN_ROLES", value: "service_role" },
                {
                  name: "GOTRUE_JWT_DEFAULT_GROUP_NAME",
                  value: "authenticated",
                },
                {
                  name: "GOTRUE_JWT_ISSUER",
                  value: "https://supabase.alanwalton.com/auth/v1",
                },
                {
                  name: "GOTRUE_SITE_URL",
                  value: "https://alanwalton.com",
                },
                {
                  name: "GOTRUE_URI_ALLOW_LIST",
                  value:
                    "https://alanwalton.com,https://dev.alanwalton.com,https://atlas.alanwalton.com,https://tempereso.com,https://dev.tempereso.com,https://archiveofworlds.app,https://dev.archiveofworlds.app",
                },
                { name: "GOTRUE_DISABLE_SIGNUP", value: "false" },
                {
                  name: "GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED",
                  value: "true",
                },
                { name: "GOTRUE_MAILER_AUTOCONFIRM", value: "true" },
                {
                  name: "GOTRUE_EXTERNAL_EMAIL_ENABLED",
                  value: "true",
                },
                { name: "GOTRUE_PASSWORD_MIN_LENGTH", value: "8" },
                { name: "GOTRUE_LOG_LEVEL", value: "info" },
                { name: "GOTRUE_SMTP_HOST", value: "" },
              ],
              resources: {
                requests: { cpu: "50m", memory: "256Mi" },
                limits: { memory: "256Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 65532,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              readinessProbe: {
                httpGet: { path: "/health", port: HTTP_PORT },
                initialDelaySeconds: 5,
                periodSeconds: 10,
              },
              livenessProbe: {
                httpGet: { path: "/health", port: HTTP_PORT },
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

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "service", yaml: serviceYaml() },
    { name: "deployment", yaml: deploymentYaml() },
  ]
}
