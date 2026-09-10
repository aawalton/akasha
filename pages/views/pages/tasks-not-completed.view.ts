import type { View } from "../view.page-type.types.ts"

export const tasksNotCompleted = {
  id: "01a06577-2615-700b-ba4a-6d91b781b8ac",
  pageTypeSlug: "view",
  type: "view",
  slug: "tasks-not-completed",
  title: "Not Completed",
  nav: "tasks",
  pageType: "to-do",
  viewPlace: 2,
  layout: "cards",
  narrows: [{ key: "to-do-completed-at", comparison: "empty", values: ["true"] }],
  viewSorts: [{ key: "to-do-sort-order", descending: false }],
  visibleProperties: ["to-do-due-date", "due-time", "link"],
  hiddenPropertiesOrder: ["to-do-recurrence", "to-do-sort-order", "to-do-category"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
