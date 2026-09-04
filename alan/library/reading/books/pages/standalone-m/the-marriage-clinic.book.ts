import type { Book } from "../../book.page-type.ts"

export const theMarriageClinic = {
  id: "019db533-f38a-71f7-ad41-c69feaadee3e",
  pageTypeSlug: "book",
  slug: "the-marriage-clinic",
  title: "The Marriage Clinic",
  status: "not-started",
  author: "John Mordechai Gottman",
  unitSlug: "words",
  ownLength: 227250,
  publishedAt: "2020-06-23",
} as const satisfies Book
