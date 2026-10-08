import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const journalsVolume1 = {
  id: "019db533-f39d-7496-afe4-d69832a342a7",
  type: "page-type/book",
  slug: "journals-volume-1",
  title: "Journals Volume 1",
  status: "not-started",
  author: "WrightGroup/McGraw-Hill",
  unit: "unit/words",
  position: 1,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
