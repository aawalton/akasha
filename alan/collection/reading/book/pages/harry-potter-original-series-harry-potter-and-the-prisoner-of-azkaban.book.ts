import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const harryPotterOriginalSeriesHarryPotterAndThePrisonerOfAzkaban = {
  id: "019db533-f38b-7033-a61e-4594c356cd99",
  type: "page-type/book",
  slug: "harry-potter-original-series-harry-potter-and-the-prisoner-of-azkaban",
  title: "Harry Potter Original Series: Harry Potter and the Prisoner of Azkaban",
  status: "completed",
  grade: "B",
  unit: "unit/words",
  position: 3,
  ownLength: 109250,
  ownProgress: 109250,
  publishedAt: "2015-12-08",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0192CTMX2",
      externalLink: "https://amazon.com/dp/B0192CTMX2",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
