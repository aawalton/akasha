import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theMarriageClinic = {
  id: "019db533-f38a-71f7-ad41-c69feaadee3e",
  type: "page-type/book",
  slug: "the-marriage-clinic",
  title: "The Marriage Clinic",
  status: "not-started",
  author: "John Mordechai Gottman",
  unit: "unit/words",
  ownLength: 227250,
  publishedAt: "2020-06-23",
} as const satisfies Book
