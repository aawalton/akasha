import type { Book } from "../../book.page-type.ts"

export const andBabyMakesThree = {
  id: "019db533-f38a-720b-b137-7086d5b0bac1",
  pageTypeSlug: "book",
  slug: "and-baby-makes-three",
  title: "And Baby Makes Three",
  status: "not-started",
  author: "Rebecca Winters, Christine Sparks",
  unitSlug: "words",
  ownLength: 114750,
  publishedAt: "2017-05-23",
} as const satisfies Book
