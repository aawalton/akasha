import type { Book } from "../../book.page-type.ts"

export const theGoodGuysTheLoot = {
  id: "019db533-f391-794c-aa2b-c1dec25f66a6",
  pageTypeSlug: "book",
  slug: "the-good-guys-the-loot",
  title: "The Good Guys: The Loot",
  status: "completed",
  unitSlug: "words",
  position: 4,
  ownLength: 69000,
  ownProgress: 69000,
  publishedAt: "2019-02-14",
  source: "kindle",
  externalId: "B07LCCV2HQ",
  externalLink: "https://amazon.com/dp/B07LCCV2HQ",
} as const satisfies Book
