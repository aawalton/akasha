import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const accidentalGenius = {
  id: "019db533-f39e-71b5-888e-27fb81654963",
  type: "page-type/book",
  slug: "accidental-genius",
  title: "Accidental Genius",
  status: "not-started",
  author: "Marshall Fine",
  unit: "unit/words",
  ownLength: 66750,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
