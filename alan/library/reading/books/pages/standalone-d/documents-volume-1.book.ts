import type { Book } from "../../book.page-type.ts"

export const documentsVolume1 = {
  id: "019db533-f39d-7520-a496-5e74900198b6",
  pageTypeSlug: "book",
  slug: "documents-volume-1",
  title: "Documents Volume 1",
  status: "not-started",
  author: "James Whitford Bashford",
  unitSlug: "words",
  position: 1,
} as const satisfies Book
