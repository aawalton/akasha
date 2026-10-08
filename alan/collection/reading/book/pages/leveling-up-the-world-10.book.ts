import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const levelingUpTheWorld10 = {
  id: "019db533-f391-7127-8111-f90c15c8622f",
  type: "page-type/book",
  slug: "leveling-up-the-world-10",
  title: "Leveling Up The World 10",
  status: "completed",
  author: "Jonathan Swift",
  unit: "unit/words",
  position: 10,
  ownLength: 190500,
  ownProgress: 190500,
  publishedAt: "2025-02-26",
  partOfCollections: ["book-series/leveling-up-the-world"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DNFZRGKP",
      externalLink: "https://amazon.com/dp/B0DNFZRGKP",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
