import type { Book } from "../../book.page-type.ts"

export const discworldEric = {
  id: "019db533-f38a-7eb0-99c2-2dba364db3f6",
  pageTypeSlug: "book",
  slug: "discworld-eric",
  title: "Discworld: Eric",
  status: "not-started",
  author: "Terry Pratchett",
  unitSlug: "words",
  position: 9,
  ownLength: 37250,
  publishedAt: "2012-12-20",
  source: "kindle",
  externalId: "B00GU32WNY",
  externalLink: "https://amazon.com/dp/B00GU32WNY",
} as const satisfies Book
