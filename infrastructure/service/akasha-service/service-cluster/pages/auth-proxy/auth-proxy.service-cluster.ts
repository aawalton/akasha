import type { ServiceCluster } from "akasha/infrastructure/service/akasha-service/service-cluster/service-cluster.page-type.types.ts"

export const authProxy = {
  id: "01a06863-8e7c-7a70-a620-0a4edd125d51",
  type: "page-type/service-cluster",
  slug: "auth-proxy",
  definition: "what decides who a request is from before it reaches anything",
  resourceKind: "Deployment",
  namespace: "auth-proxy",
  resourceName: "auth-proxy",
  image: "registry.registry.svc.cluster.local:5000/infra/auth-proxy",
  replicas: 2,
  containerPort: 3080,
  manifest: ["manifest/auth-proxy-manifests"],
} as const satisfies ServiceCluster
