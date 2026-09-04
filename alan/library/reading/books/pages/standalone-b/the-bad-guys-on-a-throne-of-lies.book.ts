import type { Book } from "../../book.page-type.ts"

export const theBadGuysOnAThroneOfLies = {
  id: "019db533-f391-776d-ab4e-8a4e2401fe5a",
  pageTypeSlug: "book",
  slug: "the-bad-guys-on-a-throne-of-lies",
  title: "The Bad Guys: On a Throne of Lies",
  kind: "read",
  status: "not-started",
  author: "SuperSummary",
  unitSlug: "words",
  position: 10,
  ownLength: 108750,
  publishedAt: "2023-07-22",
  source: "kindle",
  externalId: "B0B53WKS1P",
  externalLink: "https://amazon.com/dp/B0B53WKS1P",
} as const satisfies Book
