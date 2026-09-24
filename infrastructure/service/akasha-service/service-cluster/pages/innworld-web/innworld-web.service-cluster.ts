import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const innworldWeb = {
  id: "01a0c5ec-0cf0-74d5-addc-e006075fa4d7",
  type: "page-type/service-cluster",
  slug: "innworld-web",
  definition: "what serves innworld.wiki",
  resourceKind: "Deployment",
  namespace: "innworld",
  resourceName: "web",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifest: ["manifest/wandering-inn-wiki-web-manifests"],
  secrets: ["secret/git-transport-secrets-git-access-token"],
} as const satisfies ServiceCluster
