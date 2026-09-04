import type { View } from "../view.page-type.ts"

export const booksReading = {
  id: "01a06577-2614-700c-9e64-81a8db643cbc",
  pageTypeSlug: "view",
  slug: "books-reading",
  title: "Reading",
  navSlug: "books",
  viewPlace: 0,
  layout: "cards",
  narrows: [{ key: "status", comparison: "in", values: ["In Progress", "Following"] }],
  viewSorts: [{ key: "title", descending: false }],
  visibleProperties: ["status", "rating", "length"],
} as const satisfies View
