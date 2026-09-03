import type { Book } from "../../book.page-type.ts"

export const theBadGuysBackToOne = {
  id: "019db533-f391-779b-8ac8-6e8544ad6615",
  pageTypeSlug: "book",
  slug: "the-bad-guys-back-to-one",
  title: "The Bad Guys: Back to One",
  kind: "read",
  status: "not-started",
  author: "Graham Moore",
  unitSlug: "words",
  position: 7,
  ownLength: 93000,
  publishedAt: "2021-09-11",
  source: "kindle",
  externalId: "B08QQ6J1LH",
  externalLink: "https://amazon.com/dp/B08QQ6J1LH",
} as const satisfies Book
