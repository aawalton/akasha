import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bunnyGirlEvolution3 = {
  id: "019db533-f387-7cf5-a8df-9628be1306b4",
  type: "page-type/book",
  slug: "bunny-girl-evolution-3",
  title: "Bunny Girl Evolution 3",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 135750,
  ownProgress: 135750,
  publishedAt: "2026-01-01",
  partOfCollections: ["book-series/bunny-girl-evolution"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FX3LWS9Y",
      externalLink: "https://amazon.com/dp/B0FX3LWS9Y",
    },
  ],
  createdAt: "2026-04-22T12:39:34.023Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
