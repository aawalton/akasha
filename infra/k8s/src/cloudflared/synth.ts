import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { HOSTNAME_KEY, workloadClassMemberSelector } from "@infra/k8s-types/hostnames"

const NAMESPACE = "cloudflared"
const APP_NAME = "cloudflared"
const INSTANCE_NAME = "cloudflared"
const COMPONENT = "tunnel"
const PART_OF = "cloudflared"
const MANAGED_BY = "deploy-script"
const CLOUDFLARED_IMAGE = "cloudflare/cloudflared:2026.3.0"
const DDNS_IMAGE = "registry.registry.svc.cluster.local:5000/cluster/ci:latest"

const NAMESPACE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const DEPLOYMENT_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": COMPONENT,
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const DEPLOYMENT_SELECTOR_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
} as const

const DDNS_RESOURCE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": "ddns",
  "app.kubernetes.io/component": "ddns",
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const DDNS_POD_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": "ddns",
  "app.kubernetes.io/component": "ddns",
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

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "cloudflared",
      namespace: NAMESPACE,
      labels: DEPLOYMENT_LABELS,
    },
    spec: {
      replicas: 2,
      strategy: {
        type: "RollingUpdate",
        rollingUpdate: {
          maxUnavailable: 0,
          maxSurge: 1,
        },
      },
      selector: { matchLabels: DEPLOYMENT_SELECTOR_LABELS },
      template: {
        metadata: {
          annotations: {
            "checksum/config": "PLACEHOLDER",
            "checksum/creds": "PLACEHOLDER",
          },
          labels: DEPLOYMENT_LABELS,
        },
        spec: {
          nodeSelector: workloadClassMemberSelector("control"),
          topologySpreadConstraints: [
            {
              maxSkew: 1,
              topologyKey: HOSTNAME_KEY,
              whenUnsatisfiable: "DoNotSchedule",
              labelSelector: { matchLabels: DEPLOYMENT_SELECTOR_LABELS },
            },
          ],
          containers: [
            {
              name: "cloudflared",
              image: CLOUDFLARED_IMAGE,
              args: ["tunnel", "--config", "/etc/cloudflared/config/config.yaml", "run"],
              ports: [{ containerPort: 2000, protocol: "TCP" }],
              volumeMounts: [
                { name: "config", mountPath: "/etc/cloudflared/config", readOnly: true },
                { name: "creds", mountPath: "/etc/cloudflared/creds", readOnly: true },
              ],
              resources: {
                requests: { cpu: "30m", memory: "256Mi" },
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
                httpGet: { path: "/ready", port: 2000 },
                initialDelaySeconds: 10,
                periodSeconds: 15,
                timeoutSeconds: 5,
                failureThreshold: 3,
              },
              lifecycle: {
                preStop: {
                  exec: { command: ["sleep", "5"] },
                },
              },
              livenessProbe: {
                httpGet: { path: "/ready", port: 2000 },
                initialDelaySeconds: 10,
                periodSeconds: 15,
                timeoutSeconds: 5,
                failureThreshold: 3,
              },
            },
          ],
          volumes: [
            { name: "config", configMap: { name: "cloudflared-config" } },
            { name: "creds", secret: { secretName: "cloudflared-creds" } },
          ],
        },
      },
    },
  })
}

function ddnsCronjobYaml(): string {
  return synthOne(NAMESPACE, "ddns-cronjob", {
    apiVersion: "batch/v1",
    kind: "CronJob",
    metadata: {
      name: "ddns-headscale",
      namespace: NAMESPACE,
      labels: DDNS_RESOURCE_LABELS,
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
              labels: DDNS_POD_LABELS,
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
    { name: "deployment", yaml: deploymentYaml() },
    { name: "ddns-cronjob", yaml: ddnsCronjobYaml() },
  ]
}
