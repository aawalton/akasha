import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const honorHarringtonFieldOfDishonor = {
  id: "019db533-f39b-7007-b2db-b6ef618c1339",
  type: "page-type/book",
  slug: "honor-harrington-field-of-dishonor",
  title: "Honor Harrington: Field of Dishonor",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  position: 3,
  ownLength: 75500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00APAEID0",
      externalLink: "https://www.amazon.com/dp/B00APAEID0",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
