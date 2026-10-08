import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const documentsVolume12 = {
  id: "019db533-f39d-740a-81f8-8bc4bf2c68ec",
  type: "page-type/book",
  slug: "documents-volume-12",
  title: "Documents Volume 12",
  status: "not-started",
  author: "Matthew C. Godfrey, R. Eric Smith, Mathew J. Grow, Ronald K. Esplin",
  unit: "unit/words",
  position: 12,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
