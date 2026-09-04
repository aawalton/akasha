import type { View } from "../view.page-type.ts"

export const pipelinesSteps = {
  id: "01a06577-2615-7003-8a29-07d334c4ef19",
  pageTypeSlug: "view",
  slug: "pipelines-steps",
  title: "Steps",
  navSlug: "pipelines",
  drawsSlug: "step",
  viewPlace: 2,
  narrows: [
    {
      key: "status",
      comparison: "in",
      values: ["pending", "dispatching", "launching", "running", "failed"],
    },
  ],
  viewSorts: [{ key: "updated-at", descending: false }],
  groupBy: "status",
  visibleProperties: ["step-name", "status", "page-type-id"],
  hiddenPropertiesOrder: ["pipeline-number"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
