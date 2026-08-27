import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import {
  CNPG_POSTGRES_PRIMARY_LABELS,
  colocationAffinityPreferred,
} from "@infra/k8s-types/hostnames"

const NAMESPACE = "supabase-realtime"
const APP_LABEL = "realtime"

const REALTIME_IMAGE = "supabase/realtime:v2.86.3"
const ALPINE_IMAGE = "alpine:3.20.6"

const RESOURCE_LABELS = {
  app: APP_LABEL,
  "app.kubernetes.io/name": "realtime",
  "app.kubernetes.io/instance": "realtime",
  "app.kubernetes.io/component": "realtime",
  "app.kubernetes.io/part-of": "supabase-realtime",
  "app.kubernetes.io/managed-by": "bootstrap",
} as const

const SELECTOR_LABELS = {
  app: APP_LABEL,
} as const

const REALTIME_COMMAND_SCRIPT = `set -e
url="$DATABASE_URL"
rest="\${url#*://}"
creds="\${rest%%@*}"
hostport_db="\${rest#*@}"
export DB_USER="\${creds%%:*}"
export DB_PASSWORD="\${creds#*:}"
hostport="\${hostport_db%%/*}"
export DB_HOST="\${hostport%%:*}"
port_tail="\${hostport#*:}"
if [ "$port_tail" = "$hostport" ]; then
  export DB_PORT=5432
else
  export DB_PORT="$port_tail"
fi
dbname="\${hostport_db#*/}"
export DB_NAME="\${dbname%%\\?*}"
exec /usr/bin/tini -s -g -- /app/run.sh /app/bin/server
`

const TENANT_BOOTSTRAP_SCRIPT = `set -eu
apk add --no-cache curl jq openssl >/dev/null
REALTIME_URL=http://127.0.0.1:4000
# Parse DATABASE_URL into the quintet that the postgres_cdc_rls
# extension settings need (db_host/db_port/db_name/db_user/
# db_password). Same POSIX parameter-expansion approach the main
# container's command wrapper uses.
url="\${DATABASE_URL#*://}"
creds="\${url%%@*}"
hostport_db="\${url#*@}"
DB_USER="\${creds%%:*}"
DB_PASSWORD="\${creds#*:}"
hostport="\${hostport_db%%/*}"
DB_HOST="\${hostport%%:*}"
port_tail="\${hostport#*:}"
if [ "$port_tail" = "$hostport" ]; then DB_PORT=5432; else DB_PORT="$port_tail"; fi
dbname="\${hostport_db#*/}"
DB_NAME="\${dbname%%\\?*}"
# base64url helper (RFC 4648 §5: '+/' → '-_', strip '=' padding).
b64url() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }
# Mint a short-lived HS256 management JWT signed with
# API_JWT_SECRET. The Realtime tenant API requires an
# Authorization: Bearer token signed with the same secret the
# process boots with.
mint_token() {
  NOW=$(date +%s); EXP=$(( NOW + 300 ))
  HEADER='{"alg":"HS256","typ":"JWT"}'
  PAYLOAD=$(jq -nc --argjson iat "$NOW" --argjson exp "$EXP" \\
    '{iss:"realtime-bootstrap-sidecar",iat:$iat,exp:$exp}')
  ENC_HEADER=$(printf '%s' "$HEADER" | b64url)
  ENC_PAYLOAD=$(printf '%s' "$PAYLOAD" | b64url)
  SIGNING_INPUT="\${ENC_HEADER}.\${ENC_PAYLOAD}"
  SIG=$(printf '%s' "$SIGNING_INPUT" \\
    | openssl dgst -sha256 -hmac "$API_JWT_SECRET" -binary | b64url)
  printf '%s.%s' "$SIGNING_INPUT" "$SIG"
}
put_tenant() {
  JWKS=$(curl -fsS "$GOTRUE_JWKS_URL")
  TOKEN=$(mint_token)
  BODY=$(jq -nc \\
    --arg ext "$TENANT_EXTERNAL_ID" \\
    --argjson jwks "$JWKS" \\
    --arg dbh "$DB_HOST" --arg dbp "$DB_PORT" --arg dbn "$DB_NAME" \\
    --arg dbu "$DB_USER" --arg dbpw "$DB_PASSWORD" \\
    '{tenant:{name:$ext,external_id:$ext,max_concurrent_users:500,jwt_jwks:$jwks,extensions:[{type:"postgres_cdc_rls",settings:{db_host:$dbh,db_port:$dbp,db_name:$dbn,db_user:$dbu,db_password:$dbpw,ssl_enforced:false,region:"self-hosted",publication:"supabase_realtime",poll_interval_ms:1000,poll_max_changes:100,poll_max_record_bytes:1048576,slot_name:"supabase_realtime_replication_slot"}}]}}')
  STATUS=$(curl -sS -o /tmp/resp -w '%{http_code}' -X PUT \\
    -H "Authorization: Bearer $TOKEN" \\
    -H "Content-Type: application/json" \\
    --data "$BODY" \\
    "$REALTIME_URL/api/tenants/$TENANT_EXTERNAL_ID")
  if [ "$STATUS" = "200" ]; then
    echo "[tenant-bootstrap] PUT tenant $TENANT_EXTERNAL_ID → 200"
  else
    echo "[tenant-bootstrap] PUT tenant $TENANT_EXTERNAL_ID → $STATUS"
    cat /tmp/resp || true; echo
    return 1
  fi
}
echo "[tenant-bootstrap] waiting for realtime /healthcheck"
until curl -fsS -m 2 "$REALTIME_URL/healthcheck" >/dev/null 2>&1; do sleep 2; done
echo "[tenant-bootstrap] realtime healthy; entering self-heal loop"
# Event-driven self-heal (project #9104). PUT once now that
# realtime is healthy, then poll /healthcheck and only re-PUT on
# an observed down→up transition (a real realtime restart).
# A tenant PUT cycles the tenant connection and wipes every
# \`realtime.subscription\` row, so we MUST NOT PUT on a schedule —
# doing so would silently kill every browser \`postgres_changes\`
# subscriber on every tick. The /healthcheck endpoint is local
# and unauthenticated; we can poll it cheaply.
put_tenant || { echo "[tenant-bootstrap] initial PUT failed; retrying once in 5s"; sleep 5; put_tenant || { echo "[tenant-bootstrap] initial PUT failed twice; exiting non-zero"; exit 1; }; }
HEALTHY=1
while true; do
  if curl -fsS -m 2 "$REALTIME_URL/healthcheck" >/dev/null 2>&1; then
    if [ "$HEALTHY" = "0" ]; then
      echo "[tenant-bootstrap] realtime came back up; re-PUTting tenant"
      put_tenant || echo "[tenant-bootstrap] PUT failed; will retry on next transition"
      HEALTHY=1
    fi
  else
    HEALTHY=0
  fi
  sleep 5
done
`

function namespaceYaml(): string {
  return synthOne(NAMESPACE, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: {
      name: NAMESPACE,
      labels: {
        "kubernetes.io/metadata.name": NAMESPACE,
      },
    },
  })
}

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "realtime",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [
        {
          name: "http",
          port: 4000,
          targetPort: 4000,
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
      name: "realtime",
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
        metadata: {
          labels: RESOURCE_LABELS,
          annotations: {
            "checksum/realtime-secrets": "bootstrap",
          },
        },
        spec: {
          affinity: colocationAffinityPreferred(CNPG_POSTGRES_PRIMARY_LABELS, ["postgres"]),
          containers: [
            {
              name: "realtime",
              image: REALTIME_IMAGE,
              imagePullPolicy: "IfNotPresent",
              ports: [{ containerPort: 4000, protocol: "TCP" }],
              command: ["/bin/sh", "-c", REALTIME_COMMAND_SCRIPT],
              env: [
                { name: "APP_NAME", value: "realtime" },
                { name: "PORT", value: "4000" },
                { name: "ERL_AFLAGS", value: "-proto_dist inet_tcp" },
                { name: "DB_IP_VERSION", value: "ipv4" },
                {
                  name: "DATABASE_URL",
                  valueFrom: {
                    secretKeyRef: {
                      name: "realtime-secrets",
                      key: "DATABASE_URL",
                    },
                  },
                },
                {
                  name: "DB_AFTER_CONNECT_QUERY",
                  value: "SET search_path TO _realtime",
                },
                {
                  name: "DB_ENC_KEY",
                  valueFrom: {
                    secretKeyRef: {
                      name: "realtime-secrets",
                      key: "DB_ENC_KEY",
                    },
                  },
                },
                {
                  name: "API_JWT_SECRET",
                  valueFrom: {
                    secretKeyRef: {
                      name: "realtime-secrets",
                      key: "API_JWT_SECRET",
                    },
                  },
                },
                {
                  name: "SECRET_KEY_BASE",
                  valueFrom: {
                    secretKeyRef: {
                      name: "realtime-secrets",
                      key: "SECRET_KEY_BASE",
                    },
                  },
                },
                {
                  name: "METRICS_JWT_SECRET",
                  valueFrom: {
                    secretKeyRef: {
                      name: "realtime-secrets",
                      key: "METRICS_JWT_SECRET",
                    },
                  },
                },
                { name: "SEED_SELF_HOST", value: "true" },
                { name: "SELF_HOST_TENANT_NAME", value: "realtime" },
                { name: "RUN_JANITOR", value: "true" },
                { name: "DISABLE_HEALTHCHECK_LOGGING", value: "true" },
              ],
              resources: {
                requests: { cpu: "100m", memory: "1Gi" },
                limits: { memory: "1Gi" },
              },
              securityContext: {
                allowPrivilegeEscalation: true,
                readOnlyRootFilesystem: true,
                capabilities: {
                  drop: ["ALL"],
                  add: ["SETUID", "SETGID", "AUDIT_WRITE"],
                },
              },
              volumeMounts: [{ name: "tmp", mountPath: "/tmp" }],
              readinessProbe: {
                httpGet: { path: "/healthcheck", port: 4000 },
                initialDelaySeconds: 10,
                periodSeconds: 10,
              },
              livenessProbe: {
                httpGet: { path: "/healthcheck", port: 4000 },
                initialDelaySeconds: 30,
                periodSeconds: 30,
              },
            },
            {
              name: "tenant-bootstrap",
              image: ALPINE_IMAGE,
              imagePullPolicy: "IfNotPresent",
              env: [
                {
                  name: "API_JWT_SECRET",
                  valueFrom: {
                    secretKeyRef: {
                      name: "realtime-secrets",
                      key: "API_JWT_SECRET",
                    },
                  },
                },
                {
                  name: "DATABASE_URL",
                  valueFrom: {
                    secretKeyRef: {
                      name: "realtime-secrets",
                      key: "DATABASE_URL",
                    },
                  },
                },
                {
                  name: "GOTRUE_JWKS_URL",
                  value: "http://gotrue.gotrue.svc.cluster.local:9999/.well-known/jwks.json",
                },
                { name: "TENANT_EXTERNAL_ID", value: "realtime" },
              ],
              command: ["/bin/sh", "-c", TENANT_BOOTSTRAP_SCRIPT],
              resources: {
                requests: { cpu: "10m", memory: "64Mi" },
                limits: { memory: "64Mi" },
              },
              securityContext: {
                allowPrivilegeEscalation: false,
                readOnlyRootFilesystem: false,
                runAsNonRoot: false,
                capabilities: { drop: ["ALL"] },
              },
            },
          ],
          volumes: [{ name: "tmp", emptyDir: {} }],
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
