import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { workloadClassMemberSelector } from "@infra/k8s-types/hostnames"

export const NAMESPACE = "eso-rig"
const APP_NAME = "eso-rig"
const CONTAINER_NAME = "eso-rig"

export const IMAGE = "registry.registry.svc.cluster.local:5000/cluster/eso-rig:serving"

export const REPLICAS = 0

export const MEMORY = "8Gi"

export const WINEPREFIX_PATH = "/var/lib/eso-rig/wineprefix"

export const DEV_INPUT_PATH = "/dev/input"

const RESOURCE_LABELS = {
  app: APP_NAME,
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": APP_NAME,
  "app.kubernetes.io/component": "rig",
  "app.kubernetes.io/part-of": APP_NAME,
  "app.kubernetes.io/managed-by": "bootstrap",
} as const

const SELECTOR_LABELS = {
  app: APP_NAME,
} as const

export const namespaceManifest = {
  apiVersion: "v1",
  kind: "Namespace",
  metadata: {
    name: NAMESPACE,
    labels: { "kubernetes.io/metadata.name": NAMESPACE },
  },
} as const

export const deploymentManifest = {
  apiVersion: "apps/v1",
  kind: "Deployment",
  metadata: {
    name: "eso-rig",
    namespace: NAMESPACE,
    labels: RESOURCE_LABELS,
  },
  spec: {
    replicas: REPLICAS,
    strategy: { type: "Recreate" },
    selector: { matchLabels: SELECTOR_LABELS },
    template: {
      metadata: { labels: RESOURCE_LABELS },
      spec: {
        nodeSelector: workloadClassMemberSelector("eso-rig"),
        runtimeClassName: "nvidia",
        containers: [
          {
            name: CONTAINER_NAME,
            image: IMAGE,
            imagePullPolicy: "Always",
            env: [{ name: "WINEPREFIX", value: WINEPREFIX_PATH }],
            resources: {
              requests: { cpu: "1", memory: MEMORY, "nvidia.com/gpu": "1" },
              limits: { cpu: "4", memory: MEMORY, "nvidia.com/gpu": "1" },
            },
            securityContext: {
              privileged: true,
            },
            volumeMounts: [
              { name: "wineprefix", mountPath: WINEPREFIX_PATH },
              { name: "devinput", mountPath: DEV_INPUT_PATH },
            ],
          },
        ],
        volumes: [
          {
            name: "wineprefix",
            hostPath: { path: WINEPREFIX_PATH, type: "DirectoryOrCreate" },
          },
          {
            name: "devinput",
            hostPath: { path: DEV_INPUT_PATH, type: "Directory" },
          },
        ],
      },
    },
  },
} as const

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: synthOne(NAMESPACE, "namespace", namespaceManifest) },
    { name: "deployment", yaml: synthOne(NAMESPACE, "deployment", deploymentManifest) },
  ]
}
