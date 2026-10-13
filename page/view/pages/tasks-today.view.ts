import type { View } from "akasha/page/view/view.page-type.types.ts"

export const tasksToday = {
  id: "01a06577-2615-700c-86d0-3503613a322f",
  type: "page-type/view",
  slug: "tasks-today",
  title: "Today",
  nav: "nav/tasks",
  pageType: "page-type/to-do",
  viewPlace: 0,
  layout: "cards",
  narrows: [
    { key: "to-do-completed-at", comparison: "empty", values: ["true"] },
    { key: "to-do-due-date", comparison: "before", values: ["eso-day-next"] },
  ],
  viewSorts: [
    { key: "priority", descending: false },
    { key: "title", descending: false },
  ],
  visibleProperties: [
    "priority",
    "to-do-due-date",
    "due-time",
    "to-do-value",
    "link",
    "difficulty",
    "to-do-recurrence",
  ],
  hiddenPropertiesOrder: ["to-do-category", "to-do-sort-order"],
  pageSize: 40,
  itemPageSize: 12,
  groupPageSize: 6,
  createdAt: "2026-09-03T04:11:42.485Z",
  updatedAt: "2026-10-13T14:12:27.202Z",
} as const satisfies View
