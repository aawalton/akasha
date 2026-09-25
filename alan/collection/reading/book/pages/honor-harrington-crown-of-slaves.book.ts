import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const honorHarringtonCrownOfSlaves = {
  id: "019db533-f39b-71c9-b982-6598e8f5911b",
  type: "page-type/book",
  slug: "honor-harrington-crown-of-slaves",
  title: "Honor Harrington - Crown of Slaves",
  status: "not-started",
  unit: "unit/words",
  ownLength: 169750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00AP91PIC",
      externalLink: "https://www.amazon.com/dp/B00AP91PIC",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
