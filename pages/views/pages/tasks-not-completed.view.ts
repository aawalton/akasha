import type { View } from "../view.page-type.ts"

export const tasksNotCompleted = {
  id: "01a06577-2615-700b-ba4a-6d91b781b8ac",
  pageTypeSlug: "view",
  slug: "tasks-not-completed",
  title: "Not Completed",
  navSlug: "tasks",
  viewPlace: 2,
  layout: "cards",
  narrows: [{ key: "completed-at", comparison: "empty", values: ["true"] }],
  viewSorts: [{ key: "created-at", descending: false }],
  visibleProperties: ["due-date", "due-time", "link"],
  hiddenPropertiesOrder: ["recurrence", "sort-order", "due-date", "category"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
