import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import {
  CNPG_POSTGRES_PRIMARY_LABELS,
  colocationAffinityPreferred,
} from "@infra/k8s-types/hostnames"
import { retryTransientDdl } from "../postgres/retry-transient-ddl"

const NAMESPACE = "supabase-studio"
const APP_NAME = "supabase-studio"
const INSTANCE_NAME = "supabase-studio"
const COMPONENT = "dashboard"
const PART_OF = "supabase-studio"
const MANAGED_BY = "bootstrap"

const POSTGRES_META_IMAGE = "supabase/postgres-meta:v0.96.3"
const STUDIO_IMAGE = "supabase/studio:2026.04.08-sha-205cbe7"
const POSTGRES_IMAGE = "postgres:18"

const RESOURCE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": COMPONENT,
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const SELECTOR_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
} as const

const NAMESPACE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const ENSURE_ROLES_SCRIPT = [
  "set -u",
  'url="$DATABASE_URL"',
  'rest="${url#*://}"',
  'creds="${rest%%@*}"',
  'hostport_db="${rest#*@}"',
  'export PGUSER="${creds%%:*}"',
  'export PGPASSWORD="${creds#*:}"',
  'hostport="${hostport_db%%/*}"',
  'export PGHOST="${hostport%%:*}"',
  'port="${hostport#*:}"',
  '[ "$port" = "$PGHOST" ] && port=5432',
  'export PGPORT="$port"',
  'db="${hostport_db#*/}"',
  'export PGDATABASE="${db%%\\?*}"',
  ...retryTransientDdl({
    label: "ensure-supabase-roles",
    body: [
      'psql -v ON_ERROR_STOP=1 -c "',
      "DO \\$q\\$",
      "BEGIN",
      "  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='anon') THEN CREATE ROLE anon NOLOGIN NOINHERIT; END IF;",
      "  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='authenticated') THEN CREATE ROLE authenticated NOLOGIN NOINHERIT; END IF;",
      "  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='service_role') THEN CREATE ROLE service_role NOLOGIN NOINHERIT BYPASSRLS; END IF;",
      "  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='authenticator') THEN CREATE ROLE authenticator NOINHERIT; END IF;",
      "END",
      '\\$q\\$;"',
    ],
  }),
].join("\n")

const PG_META_SHIM_SCRIPT = `set -eu
url="$DATABASE_URL"
rest="\${url#*://}"
creds="\${rest%%@*}"
hostport_db="\${rest#*@}"
export PG_META_DB_USER="\${creds%%:*}"
export PG_META_DB_PASSWORD="\${creds#*:}"
hostport="\${hostport_db%%/*}"
export PG_META_DB_HOST="\${hostport%%:*}"
port="\${hostport#*:}"
[ "$port" = "$PG_META_DB_HOST" ] && port=5432
export PG_META_DB_PORT="$port"
db="\${hostport_db#*/}"
export PG_META_DB_NAME="\${db%%\\?*}"
exec node dist/server/server.js
`

const STUDIO_SHIM_SCRIPT = `set -eu
url="$DATABASE_URL"
rest="\${url#*://}"
creds="\${rest%%@*}"
hostport_db="\${rest#*@}"
export POSTGRES_PASSWORD="\${creds#*:}"
hostport="\${hostport_db%%/*}"
export POSTGRES_HOST="\${hostport%%:*}"
port="\${hostport#*:}"
[ "$port" = "$POSTGRES_HOST" ] && port=5432
export POSTGRES_PORT="$port"
db="\${hostport_db#*/}"
export POSTGRES_DB="\${db%%\\?*}"
exec node server.js
`

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
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "supabase-studio",
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

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "supabase-studio",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: { labels: RESOURCE_LABELS },
        spec: {
          affinity: colocationAffinityPreferred(CNPG_POSTGRES_PRIMARY_LABELS, ["postgres"]),
          initContainers: [
            {
              name: "ensure-supabase-roles",
              image: POSTGRES_IMAGE,
              env: [
                {
                  name: "DATABASE_URL",
                  valueFrom: {
                    secretKeyRef: {
                      name: "supabase-studio-secrets",
                      key: "DATABASE_URL",
                    },
                  },
                },
              ],
              command: ["/bin/sh", "-c", ENSURE_ROLES_SCRIPT],
              resources: {
                requests: { cpu: "50m", memory: "64Mi" },
                limits: { memory: "64Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 999,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
            },
          ],
          containers: [
            {
              name: "pg-meta",
              image: POSTGRES_META_IMAGE,
              imagePullPolicy: "IfNotPresent",
              ports: [{ containerPort: 8080, protocol: "TCP" }],
              command: ["/bin/sh", "-c", PG_META_SHIM_SCRIPT],
              env: [
                { name: "PG_META_PORT", value: "8080" },
                {
                  name: "DATABASE_URL",
                  valueFrom: {
                    secretKeyRef: {
                      name: "supabase-studio-secrets",
                      key: "DATABASE_URL",
                    },
                  },
                },
                {
                  name: "CRYPTO_KEY",
                  valueFrom: {
                    secretKeyRef: {
                      name: "supabase-studio-secrets",
                      key: "PG_META_CRYPTO_KEY",
                    },
                  },
                },
              ],
              resources: {
                requests: { cpu: "50m", memory: "256Mi" },
                limits: { memory: "256Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              livenessProbe: {
                httpGet: { path: "/health", port: 8080 },
                initialDelaySeconds: 10,
                periodSeconds: 30,
              },
              readinessProbe: {
                httpGet: { path: "/health", port: 8080 },
                initialDelaySeconds: 5,
                periodSeconds: 10,
              },
            },
            {
              name: "studio",
              image: STUDIO_IMAGE,
              imagePullPolicy: "IfNotPresent",
              workingDir: "/app/apps/studio",
              ports: [{ containerPort: 3000, protocol: "TCP" }],
              command: ["/bin/sh", "-c", STUDIO_SHIM_SCRIPT],
              env: [
                { name: "HOSTNAME", value: "0.0.0.0" },
                { name: "STUDIO_PG_META_URL", value: "http://localhost:8080" },
                {
                  name: "DATABASE_URL",
                  valueFrom: {
                    secretKeyRef: {
                      name: "supabase-studio-secrets",
                      key: "DATABASE_URL",
                    },
                  },
                },
                { name: "POSTGRES_USER_READ_WRITE", value: "postgres" },
                { name: "POSTGRES_USER_READ_ONLY", value: "postgres" },
                {
                  name: "PG_META_CRYPTO_KEY",
                  valueFrom: {
                    secretKeyRef: {
                      name: "supabase-studio-secrets",
                      key: "PG_META_CRYPTO_KEY",
                    },
                  },
                },
                {
                  name: "DASHBOARD_USERNAME",
                  valueFrom: {
                    secretKeyRef: {
                      name: "supabase-studio-secrets",
                      key: "DASHBOARD_USERNAME",
                    },
                  },
                },
                {
                  name: "DASHBOARD_PASSWORD",
                  valueFrom: {
                    secretKeyRef: {
                      name: "supabase-studio-secrets",
                      key: "DASHBOARD_PASSWORD",
                    },
                  },
                },
                { name: "DEFAULT_ORGANIZATION_NAME", value: "alanwalton" },
                { name: "DEFAULT_PROJECT_NAME", value: "shared-postgres" },
                { name: "SUPABASE_URL", value: "http://localhost:3000" },
                { name: "SUPABASE_PUBLIC_URL", value: "https://supabase.alanwalton.com" },
                { name: "SUPABASE_ANON_KEY", value: "disabled" },
                { name: "SUPABASE_SERVICE_KEY", value: "disabled" },
                { name: "AUTH_JWT_SECRET", value: "disabled" },
                { name: "NEXT_PUBLIC_ENABLE_LOGS", value: "false" },
                { name: "NEXT_ANALYTICS_BACKEND_PROVIDER", value: "postgres" },
                { name: "SNIPPETS_MANAGEMENT_FOLDER", value: "/app/snippets" },
                { name: "EDGE_FUNCTIONS_MANAGEMENT_FOLDER", value: "/app/edge-functions" },
              ],
              resources: {
                requests: { cpu: "50m", memory: "512Mi" },
                limits: { memory: "512Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
              volumeMounts: [
                { name: "snippets", mountPath: "/app/snippets" },
                { name: "edge-functions", mountPath: "/app/edge-functions" },
              ],
              livenessProbe: {
                httpGet: { path: "/api/platform/profile", port: 3000 },
                initialDelaySeconds: 30,
                periodSeconds: 30,
              },
              readinessProbe: {
                httpGet: { path: "/api/platform/profile", port: 3000 },
                initialDelaySeconds: 5,
                periodSeconds: 10,
              },
            },
          ],
          volumes: [
            { name: "snippets", emptyDir: {} },
            { name: "edge-functions", emptyDir: {} },
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
