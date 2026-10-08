import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theTalentCode = {
  id: "019db533-f39d-7de8-90ca-30973097b430",
  type: "page-type/book",
  slug: "the-talent-code",
  title: "The Talent Code",
  status: "not-started",
  author: "Daniel Coyle",
  unit: "unit/words",
  ownLength: 91500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
