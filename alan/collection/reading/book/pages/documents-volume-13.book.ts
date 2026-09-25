import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const documentsVolume13 = {
  id: "019db533-f39d-74ac-80bf-4bd9302bea52",
  type: "page-type/book",
  slug: "documents-volume-13",
  title: "Documents Volume 13",
  status: "not-started",
  author: "Christian K. Heimburger",
  unit: "unit/words",
  position: 13,
} as const satisfies Book
