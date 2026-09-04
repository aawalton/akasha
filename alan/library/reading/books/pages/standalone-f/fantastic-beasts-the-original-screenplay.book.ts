import type { Book } from "../../book.page-type.ts"

export const fantasticBeastsTheOriginalScreenplay = {
  id: "019db533-f38b-7046-9fab-cbe676b0732f",
  pageTypeSlug: "book",
  slug: "fantastic-beasts-the-original-screenplay",
  title: "Fantastic Beasts: The Original Screenplay",
  kind: "read",
  status: "not-started",
  author: "J. K. Rowling",
  unitSlug: "words",
  position: 2,
  ownLength: 75000,
  publishedAt: "2018-11-16",
  source: "kindle",
  externalId: "B07BL2PJ5R",
  externalLink: "https://amazon.com/dp/B07BL2PJ5R",
} as const satisfies Book
