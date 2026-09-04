import type { Book } from "../../book.page-type.ts"

export const documentsVolume6 = {
  id: "019db533-f39d-7530-9e28-10ecc5f3d584",
  pageTypeSlug: "book",
  slug: "documents-volume-6",
  title: "Documents Volume 6",
  kind: "read",
  status: "not-started",
  author: "Kentucky. General Assembly",
  unitSlug: "words",
  position: 6,
} as const satisfies Book
