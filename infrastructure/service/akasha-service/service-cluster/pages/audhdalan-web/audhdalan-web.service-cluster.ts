import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const audhdalanWeb = {
  id: "01a05b26-f8b6-702c-863b-08d754492dee",
  type: "page-type/service-cluster",
  slug: "audhdalan-web",
  definition: "what serves the site of Alan's neurodiversity writing",
  resourceKind: "Deployment",
  namespace: "audhdalan",
  resourceName: "web",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifest: ["manifest/audhdalan-web-manifests"],
} as const satisfies ServiceCluster
