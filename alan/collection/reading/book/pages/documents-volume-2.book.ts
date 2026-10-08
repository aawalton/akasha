import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const documentsVolume2 = {
  id: "019db533-f39d-7528-a485-0539d6a9feb1",
  type: "page-type/book",
  slug: "documents-volume-2",
  title: "Documents Volume 2",
  status: "not-started",
  author: "Michael P. Johnson",
  unit: "unit/words",
  position: 2,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
