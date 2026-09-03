import type { Book } from "../../book.page-type.ts"

export const documentsVolume3 = {
  id: "019db533-f39d-74da-88b8-163df90d25a5",
  pageTypeSlug: "book",
  slug: "documents-volume-3",
  title: "Documents Volume 3",
  kind: "read",
  status: "not-started",
  author: "Kentucky. General Assembly",
  unitSlug: "words",
  position: 3,
} as const satisfies Book
