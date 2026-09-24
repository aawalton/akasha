import { synthOne } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import {
  resourcesOf,
  resourcesWith,
} from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import { synthNamespaceDeploymentService } from "akasha/infrastructure/cluster/k8s-type/modules/manifest-composing/manifest-composing.module.code.ts"
import { refOf } from "akasha/infrastructure/container-image/modules/image-ref/image-ref.module.code.ts"
import { voiceInfer as page } from "akasha/infrastructure/inference/voice-inference/voice-infer/voice-infer.manifest.ts"
import { voiceInferImage } from "akasha/infrastructure/inference/voice-inference/voice-infer-image/voice-infer-image.container-recipe.ts"
import { voiceInfer } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/voice-infer/voice-infer.service-cluster.ts"

const NAMESPACE = voiceInfer.namespace
const APP_NAME = voiceInfer.resourceName
const INSTANCE_NAME = voiceInfer.resourceName
const COMPONENT = "inference"
const PART_OF = voiceInfer.namespace
const MANAGED_BY = "bootstrap"

const NODE = "node-02"

const GPU = { "nvidia.com/gpu": "1" } as const

const SERVICE_NAME = voiceInfer.resourceName
const PORT = voiceInfer.containerPort

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

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: voiceInfer.resourceName,
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: voiceInfer.replicas,
      strategy: { type: "Recreate" },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: { labels: RESOURCE_LABELS },
        spec: {
          nodeName: NODE,
          runtimeClassName: "nvidia",
          securityContext: { seccompProfile: { type: "RuntimeDefault" } },
          containers: [
            {
              name: "voice-infer",
              image: refOf(voiceInferImage),
              imagePullPolicy: "Always",
              ports: [{ containerPort: PORT, protocol: "TCP" }],
              env: [{ name: "VOICE_INFER_PORT", value: String(PORT) }],
              resources: resourcesWith(resourcesOf(page), GPU),
              startupProbe: {
                httpGet: { path: "/health", port: PORT },
                periodSeconds: 5,
                failureThreshold: 40,
              },
              readinessProbe: {
                httpGet: { path: "/health", port: PORT },
                periodSeconds: 10,
              },
              livenessProbe: {
                httpGet: { path: "/health", port: PORT },
                periodSeconds: 10,
                timeoutSeconds: 5,
                failureThreshold: 6,
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
      name: SERVICE_NAME,
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [
        {
          name: "http",
          port: PORT,
          targetPort: PORT,
          protocol: "TCP",
        },
      ],
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return synthNamespaceDeploymentService(NAMESPACE, NAMESPACE_LABELS, deploymentYaml, serviceYaml)
}
