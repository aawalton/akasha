import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const gitTransport = {
  id: "01a06816-2f11-7fe0-b5a2-6c9518d6f0c3",
  type: "page-type/service-cluster",
  slug: "git-transport",
  definition: "what serves the repositories over the network",
  resourceKind: "Deployment",
  namespace: "git",
  resourceName: "git-transport",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git",
  replicas: 1,
  containerPort: 3000,
  manifest: ["manifest/git-transport-manifests"],
  secrets: [
    "secret/git-transport-secrets-git-access-token",
    "secret/git-transport-secrets-github-access-token",
  ],
  createdAt: "2026-09-03T16:24:39.441Z",
  updatedAt: "2026-10-27T07:41:05.138Z",
} as const satisfies ServiceCluster
