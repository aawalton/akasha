import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chalionTheHallowedHunt = {
  id: "019db533-f39a-7bd2-b8c9-39e15bdd9563",
  type: "page-type/book",
  slug: "chalion-the-hallowed-hunt",
  title: "Chalion: The Hallowed Hunt",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 112000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FCK55I",
      externalLink: "https://www.amazon.com/dp/B000FCK55I",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
