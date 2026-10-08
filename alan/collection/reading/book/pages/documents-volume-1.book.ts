import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const documentsVolume1 = {
  id: "019db533-f39d-7520-a496-5e74900198b6",
  type: "page-type/book",
  slug: "documents-volume-1",
  title: "Documents Volume 1",
  status: "not-started",
  author: "James Whitford Bashford",
  unit: "unit/words",
  position: 1,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
