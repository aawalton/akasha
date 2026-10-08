import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldLordsAndLadies = {
  id: "019db533-f39a-7ec9-9e9e-eeb5bb13c6e0",
  type: "page-type/book",
  slug: "discworld-lords-and-ladies",
  title: "Discworld: Lords and Ladies",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 14,
  ownLength: 91750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000TU16R2",
      externalLink: "https://www.amazon.com/dp/B000TU16R2",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
