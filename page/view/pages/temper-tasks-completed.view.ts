import type { View } from "akasha/page/view/view.page-type.types.ts"

export const temperTasksCompleted = {
  id: "01a06577-2615-7012-8bd7-843c987d4036",
  type: "page-type/view",
  slug: "temper-tasks-completed",
  title: "Completed",
  nav: "nav/temper-tasks",
  pageType: "page-type/temper-task",
  viewPlace: 3,
  narrows: [{ key: "last-completed-at", comparison: "at-or-after", values: ["eso-day"] }],
  viewSorts: [{ key: "last-completed-at", descending: true }],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
  createdAt: "2026-09-03T04:11:42.485Z",
  updatedAt: "2026-09-15T16:37:59.000Z",
} as const satisfies View
