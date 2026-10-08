import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chaosSeedsMonsters = {
  id: "019db533-f390-7a73-b33c-5e4debf6b1b7",
  type: "page-type/book",
  slug: "chaos-seeds-monsters",
  title: "Chaos Seeds: Monsters",
  status: "completed",
  grade: "D",
  unit: "unit/words",
  position: 8,
  ownLength: 120250,
  ownProgress: 120250,
  publishedAt: "2020-01-01",
  partOfCollections: ["book-series/chaos-seeds"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08275CVM7",
      externalLink: "https://amazon.com/dp/B08275CVM7",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
