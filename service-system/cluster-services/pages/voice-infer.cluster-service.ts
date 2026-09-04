import type { ClusterService } from "../cluster-service.page-type.ts"

export const voiceInfer = {
  id: "01a06815-9efd-701d-91e7-8ab2fb023fc4",
  pageTypeSlug: "cluster-service",
  slug: "voice-infer",
  definition: "the workload turning speech into text and text into speech",
  resourceKind: "Deployment",
  namespace: "voice",
  resourceName: "voice-infer",
  image: "registry.registry.svc.cluster.local:5000/cluster/voice-infer-cu121:serving",
  replicas: 1,
  containerPort: 8080,
  manifestCode:
    "akasha/infrastructure/voice-inference/voice-infer.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
