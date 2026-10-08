import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const documentsVolume4 = {
  id: "019db533-f39d-7462-bd2d-9badbe1c0922",
  type: "page-type/book",
  slug: "documents-volume-4",
  title: "Documents Volume 4",
  status: "not-started",
  author: "Iowa. General Assembly",
  unit: "unit/words",
  position: 4,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
