import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const millennialMageBinding = {
  id: "019db533-f391-72ff-ad9a-452452c66bea",
  type: "page-type/book",
  slug: "millennial-mage-binding",
  title: "Millennial Mage: Binding",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 116750,
  ownProgress: 116750,
  publishedAt: "2023-05-26",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C2ZLX85H",
      externalLink: "https://amazon.com/dp/B0C2ZLX85H",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
