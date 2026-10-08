import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aTouchOfPowerInsight = {
  id: "019db533-f390-7670-bf24-66b6de69cf18",
  type: "page-type/book",
  slug: "a-touch-of-power-insight",
  title: "A Touch of Power: Insight",
  status: "completed",
  author: "Robert A. Baron",
  unit: "unit/words",
  position: 4,
  ownLength: 106000,
  ownProgress: 106000,
  publishedAt: "2025-06-25",
  partOfCollections: ["book-series/a-touch-of-power"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FFP79SJ5",
      externalLink: "https://amazon.com/dp/B0FFP79SJ5",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
