import type { View } from "akasha/page/view/view.page-type.types.ts"

export const tasksUpNext = {
  id: "01a06577-2615-700d-ba5e-bde16eef17ea",
  type: "page-type/view",
  slug: "tasks-up-next",
  title: "Up Next",
  nav: "nav/tasks",
  pageType: "page-type/to-do",
  viewPlace: 1,
  narrows: [
    { key: "to-do-completed-at", comparison: "empty", values: ["true"] },
    { key: "to-do-due-date", comparison: "at-or-after", values: ["eso-day-next"] },
  ],
  viewSorts: [
    { key: "to-do-due-date", descending: false },
    { key: "due-time", descending: false },
  ],
  visibleProperties: ["priority", "to-do-due-date", "due-time"],
  createdAt: "2026-09-03T04:11:42.485Z",
  updatedAt: "2026-09-21T18:59:45.000Z",
} as const satisfies View
