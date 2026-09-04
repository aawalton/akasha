import type { Book } from "../../book.page-type.ts"

export const theEndOfTheMatter = {
  id: "019db533-f399-7af5-b596-62f1bc473125",
  pageTypeSlug: "book",
  slug: "the-end-of-the-matter",
  title: "The End of the Matter",
  status: "not-started",
  author: "Alan Dean Foster",
  unitSlug: "words",
  position: 4,
} as const satisfies Book
