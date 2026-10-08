import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const millennialMageFused = {
  id: "019db533-f391-72e8-b9b7-29bc0ebc714a",
  type: "page-type/book",
  slug: "millennial-mage-fused",
  title: "Millennial Mage: Fused",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 110250,
  ownProgress: 110250,
  publishedAt: "2023-10-18",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CGF8DSQ5",
      externalLink: "https://amazon.com/dp/B0CGF8DSQ5",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
