import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const alanwaltonRequests = {
  id: "01a0c537-bbaa-7539-b1cb-abe2f072719a",
  type: "page-type/service-cluster",
  slug: "alanwalton-requests",
  definition: "what draws the Requests site",
  resourceKind: "Deployment",
  namespace: "alanwalton",
  resourceName: "requests",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifest: ["manifest/alanwalton-requests"],
  secrets: [
    "secret/alanwalton-secrets-requests-session-key",
    "secret/git-transport-secrets-git-access-token",
  ],
} as const satisfies ServiceCluster
