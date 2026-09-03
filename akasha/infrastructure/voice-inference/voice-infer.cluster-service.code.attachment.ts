import { synthOne } from "@akasha/k8s-types/cdk8s-synth"

export const NAMESPACE = "voice"
const APP_NAME = "voice-infer"
const INSTANCE_NAME = "voice-infer"
const COMPONENT = "inference"
const PART_OF = "voice"
const MANAGED_BY = "bootstrap"

export const IMAGE = "registry.registry.svc.cluster.local:5000/cluster/voice-infer-cu121:serving"

export const NODE = "node-02"

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
          annotations: { "checksum/s3-creds": "placeholder" },
        },
        spec: {
          nodeName: NODE,
          runtimeClassName: "nvidia",
          securityContext: { seccompProfile: { type: "RuntimeDefault" } },
          containers: [
            {
              name: "voice-infer",
              image: IMAGE,
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
                  valueFrom: { secretKeyRef: { name: "voice-infer-s3-creds", key: "access_key" } },
                },
                {
                  name: "SEAWEEDFS_SECRET_KEY",
                  valueFrom: { secretKeyRef: { name: "voice-infer-s3-creds", key: "secret_key" } },
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
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
