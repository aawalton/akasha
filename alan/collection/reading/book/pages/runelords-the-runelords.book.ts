import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const runelordsTheRunelords = {
  id: "019db533-f39a-78a9-a1c1-3f9fd2915763",
  type: "page-type/book",
  slug: "runelords-the-runelords",
  title: "Runelords: The Runelords",
  status: "not-started",
  author: "David Farland",
  unit: "unit/words",
  ownLength: 157000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00FO74WIK",
      externalLink: "https://www.amazon.com/dp/B00FO74WIK",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
