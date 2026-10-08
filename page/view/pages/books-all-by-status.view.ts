import type { View } from "akasha/page/view/view.page-type.types.ts"

export const booksAllByStatus = {
  id: "01a06577-2614-700a-bc90-6e8c18159c96",
  type: "page-type/view",
  slug: "books-all-by-status",
  title: "All by Status",
  nav: "nav/books",
  pageType: "page-type/ki-book",
  viewPlace: 3,
  layout: "cards",
  viewSorts: [{ key: "title", descending: false }],
  groupSorts: [{ key: "status", descending: true }],
  groupBy: "status",
  visibleProperties: ["status", "grade"],
  createdAt: "2026-09-03T04:11:42.484Z",
  updatedAt: "2026-09-21T19:33:21.000Z",
} as const satisfies View
