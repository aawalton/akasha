import type { Book } from "../../book.page-type.ts"

export const documentsVolume8 = {
  id: "019db533-f39d-749e-b635-4f5ea4729c26",
  pageTypeSlug: "book",
  slug: "documents-volume-8",
  title: "Documents Volume 8",
  kind: "read",
  status: "not-started",
  author: "Ronald K. Esplin",
  unitSlug: "words",
  position: 8,
} as const satisfies Book
