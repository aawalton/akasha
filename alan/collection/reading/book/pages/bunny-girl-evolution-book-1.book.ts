import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bunnyGirlEvolutionBook1 = {
  id: "019db533-f38b-7609-8a72-1d2cdd9f4440",
  type: "page-type/book",
  slug: "bunny-girl-evolution-book-1",
  title: "Bunny Girl Evolution",
  status: "completed",
  author: "Ann H. Coulter",
  unit: "unit/words",
  position: 1,
  ownLength: 157000,
  ownProgress: 157000,
  publishedAt: "2025-07-01",
  partOfCollections: ["book-series/bunny-girl-evolution"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F9NR9G4D",
      externalLink: "https://amazon.com/dp/B0F9NR9G4D",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
