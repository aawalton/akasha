import type { Book } from "../../book.page-type.ts"

export const documentsVolume10 = {
  id: "019db533-f39d-74d3-ad05-9ddb0ad0b269",
  pageTypeSlug: "book",
  slug: "documents-volume-10",
  title: "Documents Volume 10",
  kind: "read",
  status: "not-started",
  author: "Saint 1581-1660 Vincent De Paul",
  unitSlug: "words",
  position: 10,
} as const satisfies Book
