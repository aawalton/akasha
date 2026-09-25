import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aTouchOfPowerSiphon = {
  id: "019db533-f390-7652-a5a0-e30e45d7c2d6",
  type: "page-type/book",
  slug: "a-touch-of-power-siphon",
  title: "A Touch of Power: Siphon",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 83500,
  ownProgress: 83500,
  publishedAt: "2025-06-25",
  partOfCollections: ["book-series/a-touch-of-power"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FFPK5VCN",
      externalLink: "https://amazon.com/dp/B0FFPK5VCN",
    },
  ],
} as const satisfies Book
