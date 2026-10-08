import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cultureUseOfWeapons = {
  id: "019db533-f39a-794a-834b-1008f754ef4d",
  type: "page-type/book",
  slug: "culture-use-of-weapons",
  title: "Culture: Use of Weapons",
  status: "not-started",
  author: "Iain Banks",
  unit: "unit/words",
  position: 2,
  ownLength: 128500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0015DWLTE",
      externalLink: "https://www.amazon.com/dp/B0015DWLTE",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
