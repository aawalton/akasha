import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aTouchOfPowerSense = {
  id: "019db533-f390-7661-bc9a-0c64628e4dd9",
  type: "page-type/book",
  slug: "a-touch-of-power-sense",
  title: "A Touch of Power: Sense",
  status: "completed",
  author: "Robert A. Baron",
  unit: "unit/words",
  position: 3,
  ownLength: 121500,
  ownProgress: 121500,
  publishedAt: "2025-06-25",
  partOfCollections: ["book-series/a-touch-of-power"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FFR6LRG3",
      externalLink: "https://amazon.com/dp/B0FFR6LRG3",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
