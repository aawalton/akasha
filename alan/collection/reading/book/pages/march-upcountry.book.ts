import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const marchUpcountry = {
  id: "019db533-f39a-7f99-9bd4-579f74a99422",
  type: "page-type/book",
  slug: "march-upcountry",
  title: "March Upcountry",
  status: "not-started",
  author: "David Weber, John Ringo",
  unit: "unit/words",
  ownLength: 135000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00BEQP3K6",
      externalLink: "https://www.amazon.com/dp/B00BEQP3K6",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
