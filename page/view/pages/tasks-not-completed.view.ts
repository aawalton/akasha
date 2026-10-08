import type { View } from "akasha/page/view/view.page-type.types.ts"

export const tasksNotCompleted = {
  id: "01a06577-2615-700b-ba4a-6d91b781b8ac",
  type: "page-type/view",
  slug: "tasks-not-completed",
  title: "Not Completed",
  nav: "nav/tasks",
  pageType: "page-type/to-do",
  viewPlace: 2,
  layout: "cards",
  narrows: [{ key: "to-do-completed-at", comparison: "empty", values: ["true"] }],
  viewSorts: [{ key: "to-do-sort-order", descending: false }],
  visibleProperties: ["to-do-due-date", "due-time", "link"],
  hiddenPropertiesOrder: ["to-do-recurrence", "to-do-sort-order", "to-do-category"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
  createdAt: "2026-09-03T04:11:42.485Z",
  updatedAt: "2026-09-15T16:37:59.000Z",
} as const satisfies View
