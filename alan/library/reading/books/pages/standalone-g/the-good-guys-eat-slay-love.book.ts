import type { Book } from "../../book.page-type.ts"

export const theGoodGuysEatSlayLove = {
  id: "019db533-f391-793b-97c4-b3d805f077ea",
  pageTypeSlug: "book",
  slug: "the-good-guys-eat-slay-love",
  title: "The Good Guys: Eat, Slay, Love",
  status: "completed",
  author: "Winsor McCay",
  unitSlug: "words",
  position: 10,
  ownLength: 97000,
  ownProgress: 97000,
  publishedAt: "2021-02-25",
  source: "kindle",
  externalId: "B089DPBM26",
  externalLink: "https://amazon.com/dp/B089DPBM26",
} as const satisfies Book
