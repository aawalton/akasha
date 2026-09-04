import type { ClusterService } from "../cluster-service.page-type.ts"

export const calendarSync = {
  id: "01a04503-33d3-781e-98bd-31c189157dc2",
  pageTypeSlug: "cluster-service",
  slug: "calendar-sync",
  definition: "the daily job that brings Google calendar events into this system",
  resourceKind: "CronJob",
  namespace: "alanwalton",
  resourceName: "calendar-sync",
  image: "registry.registry.svc.cluster.local:5000/alanwalton/alanwalton-calendar-sync",
  schedule: "40 8 * * *",
  manifestCode: "calendar-sync/calendar-sync.cluster-service.code.attachment.ts",
} as const satisfies ClusterService
