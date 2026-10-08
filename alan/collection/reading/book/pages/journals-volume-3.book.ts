import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const journalsVolume3 = {
  id: "019db533-f39d-7548-82dc-2bd73bb45f38",
  type: "page-type/book",
  slug: "journals-volume-3",
  title: "Journals Volume 3",
  status: "not-started",
  author: "Abraham John Valpy, Edmund Henry Barker",
  unit: "unit/words",
  position: 3,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
