import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const honorHarringtonAtAllCosts = {
  id: "019db533-f39b-71a1-923a-c6bef8c14b00",
  type: "page-type/book",
  slug: "honor-harrington-at-all-costs",
  title: "Honor Harrington: At All Costs",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  position: 10,
  ownLength: 272500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00AP9CUWM",
      externalLink: "https://www.amazon.com/dp/B00AP9CUWM",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
