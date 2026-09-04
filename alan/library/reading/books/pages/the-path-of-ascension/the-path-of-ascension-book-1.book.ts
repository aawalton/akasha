import type { Book } from "../../book.page-type.ts"

export const thePathOfAscensionBook1 = {
  id: "019db533-f391-73ab-bdc5-f0ce03b6917a",
  pageTypeSlug: "book",
  slug: "the-path-of-ascension-book-1",
  title: "The Path of Ascension",
  status: "completed",
  author: "C. Mantis",
  unitSlug: "words",
  position: 1,
  ownLength: 203000,
  ownProgress: 203000,
  publishedAt: "2022-10-04",
  partOfSlugs: ["book-series/the-path-of-ascension"],
  source: "kindle",
  externalId: "B0B5WNDY21",
  externalLink: "https://amazon.com/dp/B0B5WNDY21",
} as const satisfies Book
