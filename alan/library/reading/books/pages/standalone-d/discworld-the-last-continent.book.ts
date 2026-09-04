import type { Book } from "../../book.page-type.ts"

export const discworldTheLastContinent = {
  id: "019db533-f388-7df6-acb3-62098780eaec",
  pageTypeSlug: "book",
  slug: "discworld-the-last-continent",
  title: "Discworld: The Last Continent",
  kind: "read",
  status: "not-started",
  author: "Terry Pratchett",
  unitSlug: "words",
  position: 23,
  ownLength: 96000,
  publishedAt: "2009-10-13",
  source: "kindle",
  externalId: "B000W5MIHG",
  externalLink: "https://www.amazon.com/gp/product/B000W5MIHG",
} as const satisfies Book
