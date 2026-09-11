import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const discworldTheWeeFreeMen = {
  id: "019db533-f388-7e78-8af9-3ac0cc476ab0",
  type: "book",
  slug: "discworld-the-wee-free-men",
  title: "Discworld: The Wee Free Men",
  status: "not-started",
  author: "Terry Pratchett, Paul Kidby",
  unit: "words",
  position: 30,
  ownLength: 99750,
  publishedAt: "2009-10-06",
  source: "kindle",
  externalId: "B000R33QWY",
  externalLink: "https://www.amazon.com/gp/product/B000R33QWY",
} as const satisfies Book
