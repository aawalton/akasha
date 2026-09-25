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
} as const satisfies Book
