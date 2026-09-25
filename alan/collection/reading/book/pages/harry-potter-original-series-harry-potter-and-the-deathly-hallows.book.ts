import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const harryPotterOriginalSeriesHarryPotterAndTheDeathlyHallows = {
  id: "019db533-f38b-701b-9803-1230fe2f52d5",
  type: "page-type/book",
  slug: "harry-potter-original-series-harry-potter-and-the-deathly-hallows",
  title: "Harry Potter Original Series: Harry Potter and the Deathly Hallows",
  status: "completed",
  grade: "B",
  unit: "unit/words",
  position: 7,
  ownLength: 191500,
  ownProgress: 191500,
  publishedAt: "2015-12-08",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0192CTMWS",
      externalLink: "https://amazon.com/dp/B0192CTMWS",
    },
  ],
} as const satisfies Book
