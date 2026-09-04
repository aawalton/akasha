import type { View } from "../view.page-type.ts"

export const temperTasksToday = {
  id: "01a06577-2615-7013-9677-41fc4ae2ad08",
  pageTypeSlug: "view",
  slug: "temper-tasks-today",
  title: "Today",
  navSlug: "temper-tasks",
  drawsSlug: "temper-task",
  viewPlace: 0,
  narrows: [
    { key: "completed-at", comparison: "empty", values: ["true"] },
    { key: "due-date", comparison: "before", values: ["eso-day-next"] },
  ],
  viewSorts: [
    { key: "priority", descending: false },
    { key: "character-sort-order", descending: true },
    { key: "title", descending: false },
  ],
  visibleProperties: [
    "priority",
    "progress",
    "character",
    "rrule",
    "due-date",
    "due-time",
    "scope",
    "link",
  ],
  hiddenPropertiesOrder: ["page-type-id", "completion-card-id"],
  pageSize: 40,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
