import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const readyPlayerOneReadyPlayerTwo = {
  id: "019db533-f391-7458-8f9d-68a06940d51d",
  type: "page-type/book",
  slug: "ready-player-one-ready-player-two",
  title: "Ready Player One: Ready Player Two",
  status: "not-started",
  author: "Ernest Cline",
  unit: "unit/words",
  position: 2,
  ownLength: 91750,
  publishedAt: "2020-11-24",
  partOfCollections: ["book-series/ready-player-one"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08BYWH6CS",
      externalLink: "https://amazon.com/dp/B08BYWH6CS",
    },
  ],
} as const satisfies Book
