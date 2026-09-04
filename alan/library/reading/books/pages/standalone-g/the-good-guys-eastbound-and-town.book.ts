import type { Book } from "../../book.page-type.ts"

export const theGoodGuysEastboundAndTown = {
  id: "019db533-f391-7954-a627-e0f676cd5236",
  pageTypeSlug: "book",
  slug: "the-good-guys-eastbound-and-town",
  title: "The Good Guys: Eastbound and Town",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 8,
  ownLength: 91000,
  ownProgress: 91000,
  publishedAt: "2020-04-02",
  source: "kindle",
  externalId: "B082J9H95S",
  externalLink: "https://amazon.com/dp/B082J9H95S",
} as const satisfies Book
