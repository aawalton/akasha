import type { View } from "../view.page-type.ts"

export const booksCompleted = {
  id: "01a06577-2614-700b-8109-abdde8bac2bc",
  pageTypeSlug: "view",
  type: "view",
  slug: "books-completed",
  title: "Completed",
  nav: "books",
  pageType: "ki-book",
  viewPlace: 2,
  layout: "cards",
  narrows: [{ key: "status", comparison: "is", values: ["Completed"] }],
  viewSorts: [{ key: "completed-at", descending: true }],
  visibleProperties: ["status", "rating", "completed-at"],
} as const satisfies View
