import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const honorHarringtonWorldsOfHonorBeginnings = {
  id: "019db533-f39b-71da-813a-bc19bdf51e06",
  type: "page-type/book",
  slug: "honor-harrington-worlds-of-honor-beginnings",
  title: "Honor Harrington - Worlds of Honor: Beginnings",
  status: "not-started",
  unit: "unit/words",
  position: 5,
  ownLength: 121000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00DFLFXTY",
      externalLink: "https://www.amazon.com/dp/B00DFLFXTY",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
