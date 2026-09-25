import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const documentsVolume14 = {
  id: "019db533-f39d-73eb-a1a3-ba60bb061177",
  type: "page-type/book",
  slug: "documents-volume-14",
  title: "Documents Volume 14",
  status: "not-started",
  author: "Alex D. Smith, Adam H. Petty, Jessica M. Nelson, Spencer W. McBride",
  unit: "unit/words",
  position: 14,
} as const satisfies Book
