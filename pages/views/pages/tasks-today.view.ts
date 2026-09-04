import type { View } from "../view.page-type.ts"

export const tasksToday = {
  id: "01a06577-2615-700c-86d0-3503613a322f",
  pageTypeSlug: "view",
  slug: "tasks-today",
  title: "Today",
  navSlug: "tasks",
  viewPlace: 0,
  layout: "cards",
  narrows: [{ key: "due-date", comparison: "before", values: ["eso-day-next"] }],
  viewSorts: [
    { key: "priority", descending: false },
    { key: "title", descending: false },
  ],
  visibleProperties: [
    "priority",
    "due-date",
    "due-time",
    "value-slug",
    "link",
    "difficulty",
    "recurrence",
  ],
  hiddenPropertiesOrder: ["category", "sort-order"],
  pageSize: 40,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
