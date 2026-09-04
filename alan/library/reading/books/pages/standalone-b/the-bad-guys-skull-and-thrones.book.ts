import type { Book } from "../../book.page-type.ts"

export const theBadGuysSkullAndThrones = {
  id: "019db533-f391-77c7-92ce-eb030d8a83b3",
  pageTypeSlug: "book",
  slug: "the-bad-guys-skull-and-thrones",
  title: "The Bad Guys: Skull and Thrones",
  status: "completed",
  author: "Winsor McCay",
  unitSlug: "words",
  position: 3,
  ownLength: 104000,
  ownProgress: 104000,
  publishedAt: "2020-02-06",
  source: "kindle",
  externalId: "B07YZWJ2ZC",
  externalLink: "https://amazon.com/dp/B07YZWJ2ZC",
} as const satisfies Book
