import type { ServiceCluster } from "akasha/services/clusters/service-cluster.page-type.types.ts"

export const voiceInfer = {
  id: "01a06815-9efd-701d-91e7-8ab2fb023fc4",
  pageTypeSlug: "service-cluster",
  type: "service-cluster",
  slug: "voice-infer",
  definition: "the workload turning speech into text and text into speech",
  resourceKind: "Deployment",
  namespace: "voice",
  resourceName: "voice-infer",
  image: "registry.registry.svc.cluster.local:5000/cluster/voice-infer-cu121",
  replicas: 1,
  containerPort: 8080,
  manifest: "voice-infer",
  secrets: ["secret/voice-infer-s3-creds-access-key", "secret/voice-infer-s3-creds-secret-key"],
} as const satisfies ServiceCluster
