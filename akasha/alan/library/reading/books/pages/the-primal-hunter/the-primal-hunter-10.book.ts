import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter10 = {
  id: "019db533-f391-7a3f-9db3-60065fb4017a",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-10",
  title: "The Primal Hunter 10",
  kind: "read",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unitSlug: "words",
  position: 10,
  ownLength: 159500,
  ownProgress: 159500,
  publishedAt: "2024-08-14",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B0D2Z5MC51",
  externalLink: "https://amazon.com/dp/B0D2Z5MC51",
} as const satisfies Book
