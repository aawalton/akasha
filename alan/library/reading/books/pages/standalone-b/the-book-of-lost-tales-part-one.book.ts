import type { Book } from "../../book.page-type.ts"

export const theBookOfLostTalesPartOne = {
  id: "019db533-f38a-7dde-83d2-551b65914cd3",
  pageTypeSlug: "book",
  slug: "the-book-of-lost-tales-part-one",
  title: "The Book of Lost Tales, Part One",
  status: "not-started",
  author: "J.R.R. Tolkien",
  unitSlug: "words",
  position: 1,
  publishedAt: "1983-01-01",
} as const satisfies Book
