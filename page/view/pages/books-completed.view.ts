import type { View } from "akasha/page/view/view.page-type.types.ts"

export const booksCompleted = {
  id: "01a06577-2614-700b-8109-abdde8bac2bc",
  type: "page-type/view",
  slug: "books-completed",
  title: "Completed",
  nav: "nav/books",
  pageType: "page-type/ki-book",
  viewPlace: 2,
  layout: "cards",
  narrows: [{ key: "status", comparison: "is", values: ["Completed"] }],
  viewSorts: [{ key: "completed-at", descending: true }],
  visibleProperties: ["status", "grade", "completed-at"],
  createdAt: "2026-09-03T04:11:42.484Z",
  updatedAt: "2026-09-21T19:33:21.000Z",
} as const satisfies View
