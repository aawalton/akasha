import type { Book } from "../../book.page-type.ts"

export const legionLiesOfTheBeholder = {
  id: "019db533-f39d-709b-9e18-37abba5470c4",
  pageTypeSlug: "book",
  slug: "legion-lies-of-the-beholder",
  title: "Legion: Lies of the Beholder",
  kind: "read",
  status: "not-started",
  author: "Brandon Sanderson",
  unitSlug: "words",
  position: 3,
  ownLength: 37000,
  source: "kindle",
  externalId: "B084V2FF6Q",
  externalLink: "https://www.amazon.com/dp/B084V2FF6Q",
} as const satisfies Book
