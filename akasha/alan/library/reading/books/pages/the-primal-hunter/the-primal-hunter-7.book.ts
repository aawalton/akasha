import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter7 = {
  id: "019db533-f391-7a62-bc02-6dd4931f35c4",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-7",
  title: "The Primal Hunter 7",
  kind: "read",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unitSlug: "words",
  position: 7,
  ownLength: 180500,
  ownProgress: 180500,
  publishedAt: "2023-09-20",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B0C6W5XQNW",
  externalLink: "https://amazon.com/dp/B0C6W5XQNW",
} as const satisfies Book
