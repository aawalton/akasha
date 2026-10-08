import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const levelingUpTheWorld7 = {
  id: "019db533-f391-711b-850b-49e943b632fa",
  type: "page-type/book",
  slug: "leveling-up-the-world-7",
  title: "Leveling Up The World 7",
  status: "completed",
  author: "Jonathan Swift",
  unit: "unit/words",
  position: 7,
  ownLength: 146000,
  ownProgress: 146000,
  publishedAt: "2024-04-24",
  partOfCollections: ["book-series/leveling-up-the-world"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CRD7HQ8Z",
      externalLink: "https://amazon.com/dp/B0CRD7HQ8Z",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
