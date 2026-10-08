import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const levelingUpTheWorld8 = {
  id: "019db533-f391-713e-8c2f-d738acf38bd5",
  type: "page-type/book",
  slug: "leveling-up-the-world-8",
  title: "Leveling Up The World 8",
  status: "completed",
  author: "Jonathan Swift",
  unit: "unit/words",
  position: 8,
  ownLength: 200250,
  ownProgress: 200250,
  publishedAt: "2024-08-21",
  partOfCollections: ["book-series/leveling-up-the-world"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D9PT8FLS",
      externalLink: "https://amazon.com/dp/B0D9PT8FLS",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
