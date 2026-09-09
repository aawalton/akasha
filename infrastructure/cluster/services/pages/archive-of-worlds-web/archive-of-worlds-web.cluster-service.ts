import type { ClusterService } from "../../cluster-service.page-type.ts"

export const archiveOfWorldsWeb = {
  id: "01a05b26-f8b6-7d0c-8371-3abedb498e0f",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "archive-of-worlds-web",
  definition: "what serves the site published original stories are read on",
  resourceKind: "Deployment",
  namespace: "archive-of-worlds",
  resourceName: "web",
  image: "registry.registry.svc.cluster.local:5000/cluster/bun-git:latest",
  replicas: 1,
  containerPort: 3000,
  manifest: "archive-of-worlds-web-manifests",
} as const satisfies ClusterService
