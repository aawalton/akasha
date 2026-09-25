import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const documentsVolume3 = {
  id: "019db533-f39d-74da-88b8-163df90d25a5",
  type: "page-type/book",
  slug: "documents-volume-3",
  title: "Documents Volume 3",
  status: "not-started",
  author: "Kentucky. General Assembly",
  unit: "unit/words",
  position: 3,
} as const satisfies Book
