import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter4 = {
  id: "019db533-f391-7a72-8052-b110574841ac",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-4",
  title: "The Primal Hunter 4",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unitSlug: "words",
  position: 4,
  ownLength: 188000,
  ownProgress: 188000,
  publishedAt: "2022-12-06",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B0B8FTNMS9",
  externalLink: "https://amazon.com/dp/B0B8FTNMS9",
} as const satisfies Book
