import type { View } from "akasha/page/view/view.page-type.types.ts"

export const temperTasksToday = {
  id: "01a06577-2615-7013-9677-41fc4ae2ad08",
  type: "page-type/view",
  slug: "temper-tasks-today",
  title: "Today",
  nav: "nav/temper-tasks",
  pageType: "page-type/temper-task",
  viewPlace: 0,
  narrows: [
    { key: "due-date", comparison: "before", values: ["eso-day-next"] },
    { key: "completed-at", comparison: "empty", values: ["true"] },
  ],
  viewSorts: [
    { key: "priority", descending: false },
    { key: "character-sort-order", descending: false },
    { key: "title", descending: false },
  ],
  visibleProperties: [
    "priority",
    "progress",
    "character",
    "rrule-rule",
    "due-date",
    "due-time",
    "scope",
  ],
  hiddenPropertiesOrder: ["completion-card"],
  pageSize: 40,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
