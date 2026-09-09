import type { View } from "../view.page-type.ts"

export const temperTasksCompleted = {
  id: "01a06577-2615-7012-8bd7-843c987d4036",
  pageTypeSlug: "view",
  type: "view",
  slug: "temper-tasks-completed",
  title: "Completed",
  nav: "temper-tasks",
  pageType: "temper-task",
  viewPlace: 3,
  narrows: [{ key: "last-completed-at", comparison: "at-or-after", values: ["eso-day"] }],
  viewSorts: [{ key: "last-completed-at", descending: true }],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
