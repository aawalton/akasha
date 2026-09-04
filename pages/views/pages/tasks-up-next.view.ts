import type { View } from "../view.page-type.ts"

export const tasksUpNext = {
  id: "01a06577-2615-700d-ba5e-bde16eef17ea",
  pageTypeSlug: "view",
  slug: "tasks-up-next",
  title: "Up Next",
  navSlug: "tasks",
  viewPlace: 1,
  narrows: [
    { key: "completed-at", comparison: "empty", values: ["true"] },
    { key: "due-date", comparison: "at-or-after", values: ["eso-day-next"] },
  ],
  viewSorts: [
    { key: "due-date", descending: false },
    { key: "due-time", descending: false },
  ],
  visibleProperties: ["priority", "due-date", "due-time"],
} as const satisfies View
