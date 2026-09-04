import type { Book } from "../../book.page-type.ts"

export const theLastTide = {
  id: "019db533-f39d-7670-8508-7f01de4d4bfe",
  pageTypeSlug: "book",
  slug: "the-last-tide",
  title: "The Last Tide",
  kind: "read",
  status: "completed",
  rank: "A",
  author: "Pirateaba, Drew Gilmour, Jade McGilvray, Shane Sandulak, Matias Zanetti",
  unitSlug: "words",
  position: 1,
  ownLength: 41250,
  ownProgress: 41250,
  source: "kindle",
  externalId: "B0BPDCQNL1",
  externalLink: "https://www.amazon.com/gp/product/B0BPDCQNL1",
} as const satisfies Book
