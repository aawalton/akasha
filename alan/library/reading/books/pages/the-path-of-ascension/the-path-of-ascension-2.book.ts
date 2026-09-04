import type { Book } from "../../book.page-type.ts"

export const thePathOfAscension2 = {
  id: "019db533-f391-73ba-b7d2-ddb3d47c13ec",
  pageTypeSlug: "book",
  slug: "the-path-of-ascension-2",
  title: "The Path of Ascension 2",
  status: "completed",
  author: "C. Mantis",
  unitSlug: "words",
  position: 2,
  ownLength: 115500,
  ownProgress: 115500,
  publishedAt: "2023-02-07",
  partOfSlugs: ["book-series/the-path-of-ascension"],
  source: "kindle",
  externalId: "B0BGJN8BV8",
  externalLink: "https://amazon.com/dp/B0BGJN8BV8",
} as const satisfies Book
