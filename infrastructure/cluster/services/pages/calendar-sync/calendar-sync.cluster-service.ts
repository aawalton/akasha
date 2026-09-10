import type { ClusterService } from "../../cluster-service.page-type.types.ts"

export const calendarSync = {
  id: "01a04503-33d3-781e-98bd-31c189157dc2",
  pageTypeSlug: "cluster-service",
  type: "cluster-service",
  slug: "calendar-sync",
  definition: "the daily job that brings Google calendar events into this system",
  resourceKind: "CronJob",
  namespace: "alanwalton",
  resourceName: "calendar-sync",
  image: "registry.registry.svc.cluster.local:5000/alanwalton/alanwalton-calendar-sync",
  schedule: "40 8 * * *",
  manifest: "calendar-sync-manifests",
} as const satisfies ClusterService
