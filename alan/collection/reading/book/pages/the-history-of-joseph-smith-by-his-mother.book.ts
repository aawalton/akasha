import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theHistoryOfJosephSmithByHisMother = {
  id: "019db533-f39d-76b9-955f-cdc741ad748a",
  type: "page-type/book",
  slug: "the-history-of-joseph-smith-by-his-mother",
  title: "The History of Joseph Smith by His Mother",
  status: "not-started",
  author: "Lucy Mack Smith",
  unit: "unit/words",
  position: 11,
  ownLength: 70750,
} as const satisfies Book
