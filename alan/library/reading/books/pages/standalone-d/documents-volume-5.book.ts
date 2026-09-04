import type { Book } from "../../book.page-type.ts"

export const documentsVolume5 = {
  id: "019db533-f39d-7412-9796-6cefaed390d2",
  pageTypeSlug: "book",
  slug: "documents-volume-5",
  title: "Documents Volume 5",
  status: "not-started",
  author: "Kentucky. General Assembly",
  unitSlug: "words",
  position: 5,
} as const satisfies Book
