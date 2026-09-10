import type { View } from "../view.page-type.types.ts"

export const tasksUpNext = {
  id: "01a06577-2615-700d-ba5e-bde16eef17ea",
  pageTypeSlug: "view",
  type: "view",
  slug: "tasks-up-next",
  title: "Up Next",
  nav: "tasks",
  pageType: "to-do",
  viewPlace: 1,
  narrows: [
    { key: "to-do-completed-at", comparison: "empty", values: ["true"] },
    { key: "to-do-due-date", comparison: "at-or-after", values: ["eso-day-next"] },
  ],
  viewSorts: [
    { key: "to-do-due-date", descending: false },
    { key: "due-time", descending: false },
  ],
  visibleProperties: ["to-do-priority", "to-do-due-date", "due-time"],
} as const satisfies View
