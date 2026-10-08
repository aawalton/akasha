import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const alienOutOfTheShadows = {
  id: "019db533-f39b-72f2-ae1f-039cf737d964",
  type: "page-type/book",
  slug: "alien-out-of-the-shadows",
  title: "Alien: Out of the Shadows",
  status: "not-started",
  author: "Tim Lebbon",
  unit: "unit/words",
  ownLength: 84750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00DXKJ5TQ",
      externalLink: "https://www.amazon.com/dp/B00DXKJ5TQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
