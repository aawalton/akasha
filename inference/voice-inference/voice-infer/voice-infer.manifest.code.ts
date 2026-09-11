import { voiceInferImage } from "akasha/inference/voice-inference/voice-infer-image/voice-infer-image.container-recipe.ts"
import { synthOne } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import { synthNamespaceDeploymentService } from "akasha/infrastructure/cluster/k8s-types/manifest-composing/manifest-composing.module.code.ts"
import { secretChecksum } from "akasha/infrastructure/cluster/k8s-types/secret-checksum/secret-checksum.module.code.ts"
import { refOf } from "akasha/infrastructure/container-image/image-ref/image-ref.module.code.ts"

export const NAMESPACE = "voice"
const APP_NAME = "voice-infer"
const INSTANCE_NAME = "voice-infer"
const COMPONENT = "inference"
const PART_OF = "voice"
const MANAGED_BY = "bootstrap"

export const NODE = "node-02"

const S3_CREDS_NAME = "voice-infer-s3-creds"
const S3_CREDS_KEYS = ["access_key", "secret_key"]

export const SERVICE_NAME = "voice-infer"
export const PORT = 8080

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
      name: "voice-infer",
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: {
          labels: RESOURCE_LABELS,
          annotations: {
            "checksum/s3-creds": secretChecksum(NAMESPACE, S3_CREDS_NAME, S3_CREDS_KEYS),
          },
        },
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
              env: [
                { name: "VOICE_INFER_PORT", value: String(PORT) },
                {
                  name: "SEAWEEDFS_S3_ENDPOINT",
                  value: "http://s3-gateway.seaweedfs.svc.cluster.local:8333",
                },
                { name: "SEAWEEDFS_BUCKET", value: "agent-sessions" },
                { name: "SEAWEEDFS_REGION", value: "us-east-1" },
                {
                  name: "SEAWEEDFS_ACCESS_KEY",
                  valueFrom: { secretKeyRef: { name: S3_CREDS_NAME, key: "access_key" } },
                },
                {
                  name: "SEAWEEDFS_SECRET_KEY",
                  valueFrom: { secretKeyRef: { name: S3_CREDS_NAME, key: "secret_key" } },
                },
              ],
              resources: {
                requests: { cpu: "2", memory: "4Gi", "nvidia.com/gpu": "1" },
                limits: { cpu: "4", memory: "4Gi", "nvidia.com/gpu": "1" },
              },
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
