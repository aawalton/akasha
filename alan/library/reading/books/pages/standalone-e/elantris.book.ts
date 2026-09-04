import type { Book } from "../../book.page-type.ts"

export const elantris = {
  id: "019db533-f39d-7487-b92e-9435b75e69f0",
  pageTypeSlug: "book",
  slug: "elantris",
  title: "Elantris",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 6,
  ownLength: 145250,
  ownProgress: 145250,
  source: "kindle",
  externalId: "B003G93YLY",
  externalLink: "https://www.amazon.com/dp/B003G93YLY",
} as const satisfies Book
