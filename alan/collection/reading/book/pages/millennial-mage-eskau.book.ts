import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const millennialMageEskau = {
  id: "019db533-f391-72f4-95f7-40c3a7c3abe0",
  type: "page-type/book",
  slug: "millennial-mage-eskau",
  title: "Millennial Mage: Eskau",
  status: "completed",
  unit: "unit/words",
  position: 7,
  ownLength: 198250,
  ownProgress: 198250,
  publishedAt: "2024-05-02",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D2WLDH7R",
      externalLink: "https://amazon.com/dp/B0D2WLDH7R",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
