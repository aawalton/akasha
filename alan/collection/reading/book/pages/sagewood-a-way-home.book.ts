import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sagewoodAWayHome = {
  id: "019db533-f391-7551-9480-21fc96c0dd12",
  type: "page-type/book",
  slug: "sagewood-a-way-home",
  title: "Sagewood: A Way Home",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 96000,
  publishedAt: "2024-12-04",
  partOfCollections: ["book-series/sagewood"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DDQHN65Y",
      externalLink: "https://amazon.com/dp/B0DDQHN65Y",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
