import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const safeholdOffArmageddonReef = {
  id: "019db533-f39a-7e09-af64-cb1bdc28e464",
  type: "page-type/book",
  slug: "safehold-off-armageddon-reef",
  title: "Safehold: Off Armageddon Reef",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  ownLength: 200000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000Q67KJ2",
      externalLink: "https://www.amazon.com/dp/B000Q67KJ2",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
