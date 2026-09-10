import { synthOne } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import { configChecksum } from "akasha/infrastructure/cluster/k8s-types/config-checksum/config-checksum.module.code.ts"
import {
  HOSTNAME_KEY,
  workloadClassMemberSelector,
} from "akasha/infrastructure/cluster/k8s-types/hostnames/hostnames.module.code.ts"
import { namespaceYaml } from "akasha/infrastructure/cluster/k8s-types/k8s-namespace/k8s-namespace.module.code.ts"
import { secretChecksum } from "akasha/infrastructure/cluster/k8s-types/secret-checksum/secret-checksum.module.code.ts"
import { tunnelConfigData } from "akasha/infrastructure/cluster/manifests/tunnel-config/tunnel-config.module.code.ts"

const NAMESPACE = "cloudflared"
const APP_NAME = "cloudflared"
const INSTANCE_NAME = "cloudflared"
const COMPONENT = "tunnel"
const PART_OF = "cloudflared"
const MANAGED_BY = "deploy-script"
const CLOUDFLARED_IMAGE = "cloudflare/cloudflared:2026.3.0"
const CONFIG_NAME = "cloudflared-config"
const CREDS_NAME = "cloudflared-creds"
const CREDS_KEYS = ["credentials.json"]

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

function configmapYaml(data: Readonly<Record<string, string>>): string {
  return synthOne(NAMESPACE, "configmap", {
    apiVersion: "v1",
    kind: "ConfigMap",
    metadata: {
      name: CONFIG_NAME,
      namespace: NAMESPACE,
      labels: DEPLOYMENT_LABELS,
    },
    data,
  })
}

function deploymentYaml(data: Readonly<Record<string, string>>): string {
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
            "checksum/config": configChecksum(data),
            "checksum/creds": secretChecksum(NAMESPACE, CREDS_NAME, CREDS_KEYS),
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
            { name: "config", configMap: { name: CONFIG_NAME } },
            { name: "creds", secret: { secretName: CREDS_NAME } },
          ],
        },
      },
    },
  })
}

export default async function synth(): Promise<
  readonly { readonly name: string; readonly yaml: string }[]
> {
  const data = await tunnelConfigData()
  return [
    { name: "namespace", yaml: namespaceYaml(NAMESPACE, NAMESPACE_LABELS) },
    { name: "configmap", yaml: configmapYaml(data) },
    { name: "deployment", yaml: deploymentYaml(data) },
  ]
}
