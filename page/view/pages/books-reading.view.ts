import type { View } from "akasha/page/view/view.page-type.types.ts"

export const booksReading = {
  id: "01a06577-2614-700c-9e64-81a8db643cbc",
  type: "page-type/view",
  slug: "books-reading",
  title: "Reading",
  nav: "nav/books",
  pageType: "page-type/ki-book",
  viewPlace: 0,
  layout: "cards",
  narrows: [{ key: "status", comparison: "in", values: ["In Progress", "Following"] }],
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: ["status", "grade", "own-length"],
  createdAt: "2026-09-03T04:11:42.484Z",
  updatedAt: "2026-09-21T19:33:21.000Z",
} as const satisfies View
