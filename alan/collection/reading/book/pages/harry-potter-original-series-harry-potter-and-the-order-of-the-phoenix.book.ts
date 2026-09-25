import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const harryPotterOriginalSeriesHarryPotterAndTheOrderOfThePhoenix = {
  id: "019db533-f38a-7ee0-b8d0-ae9906d92b36",
  type: "page-type/book",
  slug: "harry-potter-original-series-harry-potter-and-the-order-of-the-phoenix",
  title: "Harry Potter Original Series: Harry Potter and the Order of the Phoenix",
  status: "completed",
  grade: "B",
  unit: "unit/words",
  position: 5,
  ownLength: 219250,
  ownProgress: 219250,
  publishedAt: "2015-12-08",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0192CTMXM",
      externalLink: "https://amazon.com/dp/B0192CTMXM",
    },
  ],
} as const satisfies Book
