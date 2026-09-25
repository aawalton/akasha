import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const honorHarringtonMissionOfHonor = {
  id: "019db533-f39a-7ef0-ac30-73688786eb20",
  type: "page-type/book",
  slug: "honor-harrington-mission-of-honor",
  title: "Honor Harrington: Mission of Honor",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  position: 11,
  ownLength: 142750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00APAQZYK",
      externalLink: "https://www.amazon.com/dp/B00APAQZYK",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
