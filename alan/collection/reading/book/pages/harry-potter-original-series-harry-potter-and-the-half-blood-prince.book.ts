import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const harryPotterOriginalSeriesHarryPotterAndTheHalfBloodPrince = {
  id: "019db533-f38a-7ec9-86c8-bc8f142b3897",
  type: "page-type/book",
  slug: "harry-potter-original-series-harry-potter-and-the-half-blood-prince",
  title: "Harry Potter Original Series: Harry Potter and the Half-Blood Prince",
  status: "completed",
  grade: "B",
  unit: "unit/words",
  position: 6,
  ownLength: 163000,
  ownProgress: 163000,
  publishedAt: "2015-12-08",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0192CTMWI",
      externalLink: "https://amazon.com/dp/B0192CTMWI",
    },
  ],
} as const satisfies Book
