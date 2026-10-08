import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dresdenFilesColdDays = {
  id: "019db533-f39b-715e-8dfe-2cc7cdf4b28b",
  type: "page-type/book",
  slug: "dresden-files-cold-days",
  title: "Dresden Files: Cold Days",
  status: "not-started",
  author: "Jim Butcher, James Marsters",
  unit: "unit/words",
  position: 13,
  ownLength: 132250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0090UOJAI",
      externalLink: "https://www.amazon.com/dp/B0090UOJAI",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
