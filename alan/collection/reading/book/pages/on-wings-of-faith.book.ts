import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const onWingsOfFaith = {
  id: "019db533-f39d-79eb-acb5-5462f55176ac",
  type: "page-type/book",
  slug: "on-wings-of-faith",
  title: "On Wings of Faith",
  status: "not-started",
  author: "Frederick W. Babbel",
  unit: "unit/words",
  position: 10,
  ownLength: 47500,
} as const satisfies Book
