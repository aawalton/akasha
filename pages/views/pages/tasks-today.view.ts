import type { View } from "../view.page-type.ts"

export const tasksToday = {
  id: "01a06577-2615-700c-86d0-3503613a322f",
  pageTypeSlug: "view",
  slug: "tasks-today",
  title: "Today",
  navSlug: "tasks",
  pageType: "to-do",
  viewPlace: 0,
  layout: "cards",
  narrows: [{ key: "to-do-due-date", comparison: "before", values: ["eso-day-next"] }],
  viewSorts: [
    { key: "to-do-priority", descending: false },
    { key: "title", descending: false },
  ],
  visibleProperties: [
    "to-do-priority",
    "to-do-due-date",
    "due-time",
    "to-do-value-slug",
    "link",
    "difficulty",
    "to-do-recurrence",
  ],
  hiddenPropertiesOrder: ["to-do-category", "to-do-sort-order"],
  pageSize: 40,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
