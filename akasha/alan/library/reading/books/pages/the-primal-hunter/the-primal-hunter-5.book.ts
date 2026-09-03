import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter5 = {
  id: "019db533-f391-7a83-ba92-795090882aa7",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-5",
  title: "The Primal Hunter 5",
  kind: "read",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unitSlug: "words",
  position: 5,
  ownLength: 168500,
  ownProgress: 168500,
  publishedAt: "2023-03-03",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B0BNJGXC6J",
  externalLink: "https://amazon.com/dp/B0BNJGXC6J",
} as const satisfies Book
