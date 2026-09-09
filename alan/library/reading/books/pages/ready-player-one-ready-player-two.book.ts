import type { Book } from "../book.page-type.ts"

export const readyPlayerOneReadyPlayerTwo = {
  id: "019db533-f391-7458-8f9d-68a06940d51d",
  pageTypeSlug: "book",
  type: "book",
  slug: "ready-player-one-ready-player-two",
  title: "Ready Player One: Ready Player Two",
  status: "not-started",
  author: "Ernest Cline",
  unit: "words",
  position: 2,
  ownLength: 91750,
  publishedAt: "2020-11-24",
  partOfCollections: ["book-series/ready-player-one"],
  source: "kindle",
  externalId: "B08BYWH6CS",
  externalLink: "https://amazon.com/dp/B08BYWH6CS",
} as const satisfies Book
