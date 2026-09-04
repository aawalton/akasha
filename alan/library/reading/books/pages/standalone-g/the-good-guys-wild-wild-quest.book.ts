import type { Book } from "../../book.page-type.ts"

export const theGoodGuysWildWildQuest = {
  id: "019db533-f391-790d-9bf1-4a6631dc5118",
  pageTypeSlug: "book",
  slug: "the-good-guys-wild-wild-quest",
  title: "The Good Guys: Wild Wild Quest",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 12,
  ownLength: 125750,
  publishedAt: "2021-07-30",
  source: "kindle",
  externalId: "B093CKCZM2",
  externalLink: "https://amazon.com/dp/B093CKCZM2",
} as const satisfies Book
