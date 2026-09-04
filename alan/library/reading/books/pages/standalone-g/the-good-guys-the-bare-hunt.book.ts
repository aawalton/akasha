import type { Book } from "../../book.page-type.ts"

export const theGoodGuysTheBareHunt = {
  id: "019db533-f391-797d-9c8b-b67d9d05e77a",
  pageTypeSlug: "book",
  slug: "the-good-guys-the-bare-hunt",
  title: "The Good Guys: The Bare Hunt",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 7,
  ownLength: 96500,
  ownProgress: 96500,
  publishedAt: "2019-12-14",
  source: "kindle",
  externalId: "B07YZT6Y44",
  externalLink: "https://amazon.com/dp/B07YZT6Y44",
} as const satisfies Book
