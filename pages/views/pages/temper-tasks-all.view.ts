import type { View } from "../view.page-type.ts"

export const temperTasksAll = {
  id: "01a06577-2615-7011-b9f4-7540cbb1b3e6",
  pageTypeSlug: "view",
  type: "view",
  slug: "temper-tasks-all",
  title: "All",
  nav: "temper-tasks",
  pageType: "temper-task",
  viewPlace: 4,
  viewSorts: [{ key: "display-order", descending: false }],
  visibleProperties: ["due-date"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
