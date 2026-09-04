import type { Book } from "../../book.page-type.ts"

export const documentsVolume4 = {
  id: "019db533-f39d-7462-bd2d-9badbe1c0922",
  pageTypeSlug: "book",
  slug: "documents-volume-4",
  title: "Documents Volume 4",
  kind: "read",
  status: "not-started",
  author: "Iowa. General Assembly",
  unitSlug: "words",
  position: 4,
} as const satisfies Book
