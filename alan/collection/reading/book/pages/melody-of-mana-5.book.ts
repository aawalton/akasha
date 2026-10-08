import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const melodyOfMana5 = {
  id: "019db533-f391-7277-bdaf-47c116aaf5a7",
  type: "page-type/book",
  slug: "melody-of-mana-5",
  title: "Melody of Mana 5",
  status: "completed",
  author: "Wandering Agent",
  unit: "unit/words",
  position: 5,
  ownLength: 52250,
  ownProgress: 52250,
  publishedAt: "2024-03-12",
  partOfCollections: ["book-series/melody-of-mana"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CP4W7S7P",
      externalLink: "https://amazon.com/dp/B0CP4W7S7P",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
