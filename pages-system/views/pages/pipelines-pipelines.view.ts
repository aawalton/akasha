import type { View } from "../view.page-type.ts"

export const pipelinesPipelines = {
  id: "01a06577-2615-7002-84c2-788a59718223",
  pageTypeSlug: "view",
  slug: "pipelines-pipelines",
  title: "Pipelines",
  navSlug: "pipelines",
  drawsSlug: "pipeline",
  viewPlace: 0,
  narrows: [
    {
      key: "status",
      comparison: "in",
      values: ["pending", "dispatching", "running", "failed", "completed"],
    },
  ],
  viewSorts: [{ key: "seq", descending: true }],
  visibleProperties: ["status"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
