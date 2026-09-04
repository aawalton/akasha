import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter6 = {
  id: "019db533-f391-7a6a-ab63-752a5aab65f3",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-6",
  title: "The Primal Hunter 6",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unitSlug: "words",
  position: 6,
  ownLength: 167500,
  ownProgress: 167500,
  publishedAt: "2023-06-09",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B0BW17HMDZ",
  externalLink: "https://amazon.com/dp/B0BW17HMDZ",
} as const satisfies Book
