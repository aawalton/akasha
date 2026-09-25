import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const honorHarringtonWarOfHonor = {
  id: "019db533-f39a-79b4-8c35-1347e577e8b9",
  type: "page-type/book",
  slug: "honor-harrington-war-of-honor",
  title: "Honor Harrington: War of Honor",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  position: 9,
  ownLength: 278500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00AP91YH4",
      externalLink: "https://www.amazon.com/dp/B00AP91YH4",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
