import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const safeholdHowFirmAFoundation = {
  id: "019db533-f39b-7069-b1bd-c8843f733be2",
  type: "page-type/book",
  slug: "safehold-how-firm-a-foundation",
  title: "Safehold: How Firm a Foundation",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  position: 4,
  ownLength: 152000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B004V9O59I",
      externalLink: "https://www.amazon.com/dp/B004V9O59I",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
