import type { View } from "../view.page-type.ts"

export const temperTasksCompleted = {
  id: "01a06577-2615-7012-8bd7-843c987d4036",
  pageTypeSlug: "view",
  slug: "temper-tasks-completed",
  title: "Completed",
  navSlug: "temper-tasks",
  viewPlace: 3,
  viewSorts: [{ key: "updated-at", descending: true }],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
