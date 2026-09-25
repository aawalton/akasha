import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGoodGuysEatSlayLove = {
  id: "019db533-f391-793b-97c4-b3d805f077ea",
  type: "page-type/book",
  slug: "the-good-guys-eat-slay-love",
  title: "The Good Guys: Eat, Slay, Love",
  status: "completed",
  author: "Winsor McCay",
  unit: "unit/words",
  position: 10,
  ownLength: 97000,
  ownProgress: 97000,
  publishedAt: "2021-02-25",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B089DPBM26",
      externalLink: "https://amazon.com/dp/B089DPBM26",
    },
  ],
} as const satisfies Book
