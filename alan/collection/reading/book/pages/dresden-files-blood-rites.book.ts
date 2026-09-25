import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dresdenFilesBloodRites = {
  id: "019db533-f39b-7220-b0fe-c8bcff766174",
  type: "page-type/book",
  slug: "dresden-files-blood-rites",
  title: "Dresden Files: Blood Rites",
  status: "not-started",
  author: "Jim Butcher",
  unit: "unit/words",
  position: 5,
  ownLength: 93000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B002YKOX3E",
      externalLink: "https://www.amazon.com/dp/B002YKOX3E",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
