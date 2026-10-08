import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernDragonsKin = {
  id: "019db533-f39b-7183-9009-2989c23a398a",
  type: "page-type/book",
  slug: "pern-dragons-kin",
  title: "Pern: Dragon's Kin",
  status: "not-started",
  author: "Anne McCaffrey, Todd McCaffrey",
  unit: "unit/words",
  position: 4,
  ownLength: 80000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBJDVQ",
      externalLink: "https://www.amazon.com/dp/B000FBJDVQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
