import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chalionPaladinOfSouls = {
  id: "019db533-f39a-7c7d-b2c7-bffc2ee465b8",
  type: "page-type/book",
  slug: "chalion-paladin-of-souls",
  title: "Chalion: Paladin of Souls",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 124000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FC138Q",
      externalLink: "https://www.amazon.com/dp/B000FC138Q",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
