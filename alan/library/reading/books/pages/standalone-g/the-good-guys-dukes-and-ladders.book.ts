import type { Book } from "../../book.page-type.ts"

export const theGoodGuysDukesAndLadders = {
  id: "019db533-f391-795c-b6d2-5c2250823f7d",
  pageTypeSlug: "book",
  slug: "the-good-guys-dukes-and-ladders",
  title: "The Good Guys: Dukes and Ladders",
  status: "completed",
  unitSlug: "words",
  position: 5,
  ownLength: 85000,
  ownProgress: 85000,
  publishedAt: "2019-04-11",
  source: "kindle",
  externalId: "B07NDPZ1VS",
  externalLink: "https://amazon.com/dp/B07NDPZ1VS",
} as const satisfies Book
