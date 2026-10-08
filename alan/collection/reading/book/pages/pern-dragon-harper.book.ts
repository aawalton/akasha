import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernDragonHarper = {
  id: "019db533-f39b-72e3-a75b-85b9d2d31ca8",
  type: "page-type/book",
  slug: "pern-dragon-harper",
  title: "Pern: Dragon Harper",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 6,
  ownLength: 96500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W93AEM",
      externalLink: "https://www.amazon.com/dp/B000W93AEM",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
