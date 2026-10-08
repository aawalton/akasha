import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const spaceOdyssey2001ASpaceOdyssey = {
  id: "019db533-f39b-74b0-a87f-527562d3ab67",
  type: "page-type/book",
  slug: "space-odyssey-2001-a-space-odyssey",
  title: "Space Odyssey: 2001: A Space Odyssey",
  status: "not-started",
  author: "Arthur C. Clarke",
  unit: "unit/words",
  ownLength: 63750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01A6E8EQ6",
      externalLink: "https://www.amazon.com/dp/B01A6E8EQ6",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
