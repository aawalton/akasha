import type { Book } from "../../book.page-type.ts"

export const documentsVolume2 = {
  id: "019db533-f39d-7528-a485-0539d6a9feb1",
  pageTypeSlug: "book",
  slug: "documents-volume-2",
  title: "Documents Volume 2",
  status: "not-started",
  author: "Michael P. Johnson",
  unitSlug: "words",
  position: 2,
} as const satisfies Book
