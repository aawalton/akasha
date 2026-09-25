import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rewire = {
  id: "019db533-f39e-7060-9558-251a590c33fd",
  type: "page-type/book",
  slug: "rewire",
  title: "Rewire",
  status: "not-started",
  author: "O'Connor, Richard (Psychotherapist), Richard O'Connor",
  unit: "unit/words",
  ownLength: 154500,
} as const satisfies Book
