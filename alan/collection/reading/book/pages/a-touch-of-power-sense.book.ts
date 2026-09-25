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
} as const satisfies Book
