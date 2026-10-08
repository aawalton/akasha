import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const millennialMageFusing = {
  id: "019db533-f391-72d2-9b33-17b96d024497",
  type: "page-type/book",
  slug: "millennial-mage-fusing",
  title: "Millennial Mage: Fusing",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 120750,
  ownProgress: 120750,
  publishedAt: "2023-08-23",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CB79G1Y6",
      externalLink: "https://amazon.com/dp/B0CB79G1Y6",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
