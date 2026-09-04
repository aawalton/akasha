import type { Book } from "../../book.page-type.ts"

export const theGoodGuysOneMoreLastTime = {
  id: "019db533-f391-796c-9de0-437457d86a7d",
  pageTypeSlug: "book",
  slug: "the-good-guys-one-more-last-time",
  title: "The Good Guys: One More Last Time",
  kind: "read",
  status: "completed",
  author: "Bible",
  unitSlug: "words",
  position: 1,
  ownLength: 81500,
  ownProgress: 81500,
  publishedAt: "2018-09-27",
  source: "kindle",
  externalId: "B07HS2MP8D",
  externalLink: "https://amazon.com/dp/B07HS2MP8D",
} as const satisfies Book
