import type { View } from "../view.page-type.ts"

export const booksToRead = {
  id: "01a06577-2614-700d-bd5e-7f0e38909e43",
  pageTypeSlug: "view",
  slug: "books-to-read",
  title: "To Read",
  navSlug: "books",
  drawsSlug: "ki-book",
  viewPlace: 1,
  layout: "cards",
  narrows: [{ key: "status", comparison: "is", values: ["Not Started"] }],
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: ["status", "rating"],
} as const satisfies View
