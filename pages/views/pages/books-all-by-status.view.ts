import type { View } from "../view.page-type.ts"

export const booksAllByStatus = {
  id: "01a06577-2614-700a-bc90-6e8c18159c96",
  pageTypeSlug: "view",
  slug: "books-all-by-status",
  title: "All by Status",
  navSlug: "books",
  viewPlace: 3,
  layout: "cards",
  viewSorts: [{ key: "title", descending: false }],
  groupSorts: [{ key: "status", descending: true }],
  groupBy: "status",
  visibleProperties: ["status", "rating"],
} as const satisfies View
