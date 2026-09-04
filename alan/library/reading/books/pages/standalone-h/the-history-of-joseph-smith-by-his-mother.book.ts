import type { Book } from "../../book.page-type.ts"

export const theHistoryOfJosephSmithByHisMother = {
  id: "019db533-f39d-76b9-955f-cdc741ad748a",
  pageTypeSlug: "book",
  slug: "the-history-of-joseph-smith-by-his-mother",
  title: "The History of Joseph Smith by His Mother",
  status: "not-started",
  author: "Lucy Mack Smith",
  unitSlug: "words",
  position: 11,
  ownLength: 70750,
} as const satisfies Book
