import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const millennialMageMage = {
  id: "019db533-f391-7318-a1f4-15970330ae59",
  type: "page-type/book",
  slug: "millennial-mage-mage",
  title: "Millennial Mage: Mage",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 106750,
  ownProgress: 106750,
  publishedAt: "2023-04-19",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C11277JH",
      externalLink: "https://amazon.com/dp/B0C11277JH",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
