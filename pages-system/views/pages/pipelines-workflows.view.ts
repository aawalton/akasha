import type { View } from "../view.page-type.ts"

export const pipelinesWorkflows = {
  id: "01a06577-2615-7004-a5f9-108f2b27b1b5",
  pageTypeSlug: "view",
  slug: "pipelines-workflows",
  title: "Workflows",
  navSlug: "pipelines",
  drawsSlug: "workflow",
  viewPlace: 1,
  viewSorts: [{ key: "updated-at", descending: true }],
  visibleProperties: ["pipeline-number", "status", "workflow-name", "page-type-id"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
