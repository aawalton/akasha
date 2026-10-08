import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const runelordsChaosbound = {
  id: "019db533-f39b-7238-a20f-bcf937be9ac9",
  type: "page-type/book",
  slug: "runelords-chaosbound",
  title: "Runelords: Chaosbound",
  status: "not-started",
  author: "David Farland",
  unit: "unit/words",
  position: 7,
  ownLength: 88000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003JBICOS",
      externalLink: "https://www.amazon.com/dp/B003JBICOS",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
