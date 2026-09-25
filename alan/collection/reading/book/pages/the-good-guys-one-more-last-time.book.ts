import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGoodGuysOneMoreLastTime = {
  id: "019db533-f391-796c-9de0-437457d86a7d",
  type: "page-type/book",
  slug: "the-good-guys-one-more-last-time",
  title: "The Good Guys: One More Last Time",
  status: "completed",
  author: "Bible",
  unit: "unit/words",
  position: 1,
  ownLength: 81500,
  ownProgress: 81500,
  publishedAt: "2018-09-27",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07HS2MP8D",
      externalLink: "https://amazon.com/dp/B07HS2MP8D",
    },
  ],
} as const satisfies Book
