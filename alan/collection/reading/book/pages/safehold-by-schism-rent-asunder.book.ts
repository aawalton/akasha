import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const safeholdBySchismRentAsunder = {
  id: "019db533-f39b-717c-b6fc-c88a605f6a71",
  type: "page-type/book",
  slug: "safehold-by-schism-rent-asunder",
  title: "Safehold: By Schism Rent Asunder",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  position: 1,
  ownLength: 184250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0011UGLSS",
      externalLink: "https://www.amazon.com/dp/B0011UGLSS",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
