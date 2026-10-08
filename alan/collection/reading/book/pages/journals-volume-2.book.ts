import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const journalsVolume2 = {
  id: "019db533-f39d-7511-8e28-87d68fefa8b5",
  type: "page-type/book",
  slug: "journals-volume-2",
  title: "Journals Volume 2",
  status: "not-started",
  author: "WrightGroup/McGraw-Hill",
  unit: "unit/words",
  position: 2,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
