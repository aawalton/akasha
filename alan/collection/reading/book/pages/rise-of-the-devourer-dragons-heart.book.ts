import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const riseOfTheDevourerDragonsHeart = {
  id: "019db533-f391-74b5-bc94-1deecd202eeb",
  type: "page-type/book",
  slug: "rise-of-the-devourer-dragons-heart",
  title: "Rise of the Devourer: Dragon's Heart",
  status: "not-started",
  unit: "unit/words",
  position: 4,
  ownLength: 102000,
  publishedAt: "2025-07-23",
  partOfCollections: ["book-series/rise-of-the-devourer"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D8487C8L",
      externalLink: "https://amazon.com/dp/B0D8487C8L",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
