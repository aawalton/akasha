import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const voiceInfer = {
  id: "01a06815-9efd-701d-91e7-8ab2fb023fc4",
  type: "page-type/service-cluster",
  slug: "voice-infer",
  definition: "the workload turning speech into text and text into speech",
  resourceKind: "Deployment",
  namespace: "voice",
  resourceName: "voice-infer",
  image: "registry.registry.svc.cluster.local:5000/cluster/voice-infer-cu121",
  replicas: 1,
  containerPort: 8080,
  manifest: ["manifest/voice-infer"],
  createdAt: "2026-09-03T16:24:02.557Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies ServiceCluster
