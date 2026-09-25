import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theTempleInTimeAndEternity = {
  id: "019db533-f39d-757e-8ec2-892fd05a9f7b",
  type: "page-type/book",
  slug: "the-temple-in-time-and-eternity",
  title: "The Temple in Time and Eternity",
  status: "not-started",
  author: "Donald W. Parry, Stephen David Ricks",
  unit: "unit/words",
  position: 1,
  ownLength: 83500,
} as const satisfies Book
