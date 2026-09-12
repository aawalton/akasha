import { workloadClassMemberSelector } from "akasha/infrastructure/cluster/k8s-types/hostnames/hostnames.module.code.ts"
import { synthOne } from "akasha/infrastructure/cluster/k8s-types/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { refOf } from "akasha/infrastructure/container-image/image-ref/image-ref.module.code.ts"
import { esoRigImage } from "akasha/infrastructure/eso-rig/image/eso-rig-image.container-recipe.ts"

const NAMESPACE = "eso-rig"
const APP_NAME = "eso-rig"
const CONTAINER_NAME = "eso-rig"

const REPLICAS = 0

const MEMORY = "8Gi"

const WINEPREFIX_PATH = "/var/lib/eso-rig/wineprefix"

const DEV_INPUT_PATH = "/dev/input"

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

const NAMESPACE_MANIFEST = {
  apiVersion: "v1",
  kind: "Namespace",
  metadata: {
    name: NAMESPACE,
    labels: { "kubernetes.io/metadata.name": NAMESPACE },
  },
} as const

function deploymentManifest() {
  return {
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
              image: refOf(esoRigImage),
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
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: synthOne(NAMESPACE, "namespace", NAMESPACE_MANIFEST) },
    { name: "deployment", yaml: synthOne(NAMESPACE, "deployment", deploymentManifest()) },
  ]
}
