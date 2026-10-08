import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldEqualRites = {
  id: "019db533-f39b-7080-9393-7bdca0681d95",
  type: "page-type/book",
  slug: "discworld-equal-rites",
  title: "Discworld: Equal Rites",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 3,
  ownLength: 64000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W9393Y",
      externalLink: "https://www.amazon.com/dp/B000W9393Y",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
