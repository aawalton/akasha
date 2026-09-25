import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const documentsVolume8 = {
  id: "019db533-f39d-749e-b635-4f5ea4729c26",
  type: "page-type/book",
  slug: "documents-volume-8",
  title: "Documents Volume 8",
  status: "not-started",
  author: "Ronald K. Esplin",
  unit: "unit/words",
  position: 8,
} as const satisfies Book
