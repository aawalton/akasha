import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernTheWhiteDragon = {
  id: "019db533-f39a-784e-bff4-916dc351b019",
  type: "page-type/book",
  slug: "pern-the-white-dragon",
  title: "Pern: The White Dragon",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 20,
  ownLength: 117000,
  publishedAt: "2002-02-26",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBFOD2",
      externalLink: "https://www.amazon.com/dp/B000FBFOD2",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
