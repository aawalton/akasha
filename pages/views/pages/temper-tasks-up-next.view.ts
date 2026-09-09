import type { View } from "../view.page-type.ts"

export const temperTasksUpNext = {
  id: "01a06577-2615-7014-b537-c9ecd384b1ee",
  pageTypeSlug: "view",
  type: "view",
  slug: "temper-tasks-up-next",
  title: "Up Next",
  nav: "temper-tasks",
  pageType: "temper-task",
  viewPlace: 1,
  narrows: [{ key: "due-date", comparison: "at-or-after", values: ["eso-day-next"] }],
  viewSorts: [
    { key: "priority", descending: false },
    { key: "character-sort-order", descending: true },
    { key: "title", descending: false },
  ],
  visibleProperties: ["priority", "progress", "character", "rrule-rule", "due-date", "due-time"],
  pageSize: 12,
  itemPageSize: 12,
  groupPageSize: 6,
} as const satisfies View
