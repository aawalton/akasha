import type { ClusterService } from "../cluster-service.page-type.ts"

export const alanwaltonAtlas = {
  id: "01a05b26-f8b6-718d-afa7-a3c62e0a1196",
  pageTypeSlug: "cluster-service",
  slug: "alanwalton-atlas",
  definition: "what draws Alan's map and takes in the locations his phone sends",
  resourceKind: "Deployment",
  namespace: "alanwalton",
  resourceName: "atlas",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifestCode: "alan/atlas-web/alanwalton-atlas.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
