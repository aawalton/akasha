import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const marchUpcountryMarchToTheSea = {
  id: "019db533-f39a-7e9f-b861-7d3a8f086399",
  type: "page-type/book",
  slug: "march-upcountry-march-to-the-sea",
  title: "March Upcountry: March to the Sea",
  status: "not-started",
  author: "John Ringo, David Weber",
  unit: "unit/words",
  position: 1,
  ownLength: 139000,
  publishedAt: "2001-05-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00C9GFSW8",
      externalLink: "https://www.amazon.com/dp/B00C9GFSW8",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
