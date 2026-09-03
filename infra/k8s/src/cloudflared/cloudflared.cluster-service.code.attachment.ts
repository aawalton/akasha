import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { HOSTNAME_KEY, workloadClassMemberSelector } from "@akasha/k8s-types/hostnames"

const NAMESPACE = "cloudflared"
const APP_NAME = "cloudflared"
const INSTANCE_NAME = "cloudflared"
const COMPONENT = "tunnel"
const PART_OF = "cloudflared"
const MANAGED_BY = "deploy-script"
const CLOUDFLARED_IMAGE = "cloudflare/cloudflared:2026.3.0"

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

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "deployment", yaml: deploymentYaml() },
  ]
}
