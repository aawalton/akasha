import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const levelingUpTheWorld9 = {
  id: "019db533-f391-7133-ae8f-a1921ca7202b",
  type: "page-type/book",
  slug: "leveling-up-the-world-9",
  title: "Leveling Up The World 9",
  status: "completed",
  author: "Jonathan Swift",
  unit: "unit/words",
  position: 9,
  ownLength: 217000,
  ownProgress: 217000,
  publishedAt: "2024-11-27",
  partOfCollections: ["book-series/leveling-up-the-world"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DD92GR3L",
      externalLink: "https://amazon.com/dp/B0DD92GR3L",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
