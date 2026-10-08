import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const honorHarringtonEchoesOfHonor = {
  id: "019db533-f39b-7040-891a-b18082247a29",
  type: "page-type/book",
  slug: "honor-harrington-echoes-of-honor",
  title: "Honor Harrington: Echoes of Honor",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  position: 7,
  ownLength: 185000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00APADZKW",
      externalLink: "https://www.amazon.com/dp/B00APADZKW",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
