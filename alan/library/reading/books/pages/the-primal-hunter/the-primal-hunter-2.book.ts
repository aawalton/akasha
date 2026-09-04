import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter2 = {
  id: "019db533-f391-7a5a-b132-8f7320adcaf8",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-2",
  title: "The Primal Hunter 2",
  status: "completed",
  author: "Zogarth",
  unitSlug: "words",
  position: 2,
  ownLength: 136000,
  ownProgress: 136000,
  publishedAt: "2022-06-14",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B09T6Z5DXT",
  externalLink: "https://amazon.com/dp/B09T6Z5DXT",
} as const satisfies Book
