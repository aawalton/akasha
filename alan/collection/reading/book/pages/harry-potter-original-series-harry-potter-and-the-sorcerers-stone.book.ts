import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const harryPotterOriginalSeriesHarryPotterAndTheSorcerersStone = {
  id: "019db533-f38b-703d-b7af-4f6a42d366f8",
  type: "page-type/book",
  slug: "harry-potter-original-series-harry-potter-and-the-sorcerers-stone",
  title: "Harry Potter Original Series: Harry Potter and the Sorcerer's Stone",
  status: "completed",
  grade: "B",
  unit: "unit/words",
  position: 1,
  ownLength: 78500,
  ownProgress: 78500,
  publishedAt: "2015-12-08",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0192CTMYG",
      externalLink: "https://amazon.com/dp/B0192CTMYG",
    },
  ],
} as const satisfies Book
