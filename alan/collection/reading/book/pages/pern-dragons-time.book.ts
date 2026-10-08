import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernDragonsTime = {
  id: "019db533-f39b-732e-b633-44b43803622f",
  type: "page-type/book",
  slug: "pern-dragons-time",
  title: "Pern: Dragon's Time",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 10,
  ownLength: 124500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B004J4WKB0",
      externalLink: "https://www.amazon.com/dp/B004J4WKB0",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
