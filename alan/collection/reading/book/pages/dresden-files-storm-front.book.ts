import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dresdenFilesStormFront = {
  id: "019db533-f39a-7b7d-b8fd-767c9ea438af",
  type: "page-type/book",
  slug: "dresden-files-storm-front",
  title: "Dresden Files: Storm Front",
  status: "not-started",
  author: "Jim Butcher",
  unit: "unit/words",
  ownLength: 83000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000WH7PLS",
      externalLink: "https://www.amazon.com/dp/B000WH7PLS",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
