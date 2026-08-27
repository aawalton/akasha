import { synthOne } from "@infra/k8s-types/cdk8s-synth"

const NAMESPACE = "ddns-headscale"
const APP_NAME = "ddns-headscale"
const COMPONENT = "ddns"
const MANAGED_BY = "deploy-script"
const DDNS_IMAGE = "registry.registry.svc.cluster.local:5000/cluster/ci:latest"

const NAMESPACE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const RESOURCE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": APP_NAME,
  "app.kubernetes.io/component": COMPONENT,
  "app.kubernetes.io/part-of": APP_NAME,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const POD_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": APP_NAME,
  "app.kubernetes.io/component": COMPONENT,
} as const

const DDNS_SCRIPT = `set -eu
PUBLIC_IP=$(curl -sf --max-time 10 https://api.ipify.org)
if ! echo "$PUBLIC_IP" | grep -qE '^[0-9.]+$'; then
  echo "[ddns] Bad public IP from ipify: '$PUBLIC_IP'" >&2
  exit 1
fi
echo "[ddns] Public IP: $PUBLIC_IP"
CF_API="https://api.cloudflare.com/client/v4"
AUTH="Authorization: Bearer $CF_TOKEN"
ZONE_ID=$(curl -sf -H "$AUTH" "$CF_API/zones?name=$ZONE" | jq -r '.result[0].id // empty')
if [ -z "$ZONE_ID" ]; then
  echo "[ddns] Zone '$ZONE' not found in Cloudflare account" >&2
  exit 1
fi
RECORDS=$(curl -sf -H "$AUTH" \\
  "$CF_API/zones/$ZONE_ID/dns_records?type=A&name=$HOSTNAME")
RECORD_ID=$(echo "$RECORDS" | jq -r '.result[0].id // empty')
CURRENT_IP=$(echo "$RECORDS" | jq -r '.result[0].content // empty')
if [ "$CURRENT_IP" = "$PUBLIC_IP" ]; then
  echo "[ddns] A record $HOSTNAME → $PUBLIC_IP is in sync"
  exit 0
fi
BODY=$(jq -n --arg name "$HOSTNAME" --arg ip "$PUBLIC_IP" \\
  '{type:"A", name:$name, content:$ip, proxied:false, ttl:60}')
# Capture HTTP code + body so we can verify Cloudflare returned
# both a 2xx AND { "success": true }. CF emits 200 with
# success:false for application-level errors (auth, schema,
# rate limit) — checking only -sf would mask those silently.
# The container runs with readOnlyRootFilesystem, so we
# append the HTTP code as a trailing line on stdout instead
# of using a temp file.
if [ -n "$RECORD_ID" ]; then
  echo "[ddns] Updating $HOSTNAME: $CURRENT_IP → $PUBLIC_IP"
  RESPONSE=$(curl -s -w '\\n%{http_code}' \\
    -X PUT -H "$AUTH" -H "Content-Type: application/json" \\
    -d "$BODY" \\
    "$CF_API/zones/$ZONE_ID/dns_records/$RECORD_ID")
else
  echo "[ddns] Creating $HOSTNAME → $PUBLIC_IP"
  RESPONSE=$(curl -s -w '\\n%{http_code}' \\
    -X POST -H "$AUTH" -H "Content-Type: application/json" \\
    -d "$BODY" \\
    "$CF_API/zones/$ZONE_ID/dns_records")
fi
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESP_BODY=$(echo "$RESPONSE" | sed '$d')
if [ "$HTTP_CODE" -lt 200 ] || [ "$HTTP_CODE" -ge 300 ]; then
  echo "[ddns] Cloudflare API HTTP $HTTP_CODE" >&2
  echo "[ddns] Response: $RESP_BODY" >&2
  exit 1
fi
if ! echo "$RESP_BODY" | jq -e '.success == true' >/dev/null; then
  echo "[ddns] Cloudflare API returned success=false (HTTP $HTTP_CODE)" >&2
  echo "[ddns] Errors: $(echo "$RESP_BODY" | jq -c '.errors // []')" >&2
  exit 1
fi
echo "[ddns] Done"
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

function cronjobYaml(): string {
  return synthOne(NAMESPACE, "cronjob", {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: {
      name: "ddns-headscale",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      schedule: "*/5 * * * *",
      concurrencyPolicy: "Forbid",
      successfulJobsHistoryLimit: 1,
      failedJobsHistoryLimit: 3,
      jobTemplate: {
        spec: {
          backoffLimit: 1,
          activeDeadlineSeconds: 120,
          template: {
            metadata: {
              labels: POD_LABELS,
            },
            spec: {
              restartPolicy: "Never",
              containers: [
                {
                  name: "ddns",
                  image: DDNS_IMAGE,
                  env: [
                    { name: "HOSTNAME", value: "headscale.alanwalton.com" },
                    { name: "ZONE", value: "alanwalton.com" },
                    {
                      name: "CF_TOKEN",
                      valueFrom: {
                        secretKeyRef: {
                          name: "cloudflare-api-token",
                          key: "api-token",
                        },
                      },
                    },
                  ],
                  command: ["/bin/sh", "-c", DDNS_SCRIPT],
                  resources: {
                    requests: { cpu: "10m", memory: "64Mi" },
                    limits: { memory: "64Mi" },
                  },
                  securityContext: {
                    runAsNonRoot: true,
                    runAsUser: 1000,
                    readOnlyRootFilesystem: true,
                    allowPrivilegeEscalation: false,
                    capabilities: { drop: ["ALL"] },
                  },
                },
              ],
            },
          },
        },
      },
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "cronjob", yaml: cronjobYaml() },
  ]
}
