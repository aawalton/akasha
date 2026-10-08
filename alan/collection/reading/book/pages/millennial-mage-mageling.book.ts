import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const millennialMageMageling = {
  id: "019db533-f391-7323-b9ac-3efe779aa980",
  type: "page-type/book",
  slug: "millennial-mage-mageling",
  title: "Millennial Mage: Mageling",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 137250,
  ownProgress: 137250,
  publishedAt: "2023-03-15",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BX4KLJPZ",
      externalLink: "https://amazon.com/dp/B0BX4KLJPZ",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
