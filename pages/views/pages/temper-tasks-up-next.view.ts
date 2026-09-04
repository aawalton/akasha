import type { View } from "../view.page-type.ts"

export const temperTasksUpNext = {
  id: "01a06577-2615-7014-b537-c9ecd384b1ee",
  pageTypeSlug: "view",
  slug: "temper-tasks-up-next",
  title: "Up Next",
  navSlug: "temper-tasks",
  viewPlace: 1,
  narrows: [
    { key: "completed-at", comparison: "empty", values: ["true"] },
    { key: "due-date", comparison: "at-or-after", values: ["eso-day-next"] },
  ],
  viewSorts: [
    { key: "priority", descending: false },
    { key: "character-sort-order", descending: true },
    { key: "title", descending: false },
  ],
  visibleProperties: ["priority", "progress", "character", "rrule", "due-date", "due-time"],
  hiddenPropertiesOrder: ["page-type-id"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
