import type { Book } from "../../book.page-type.ts"

export const theLostFleetCourageous = {
  id: "019db533-f39a-7916-97d1-f6735b8afd96",
  pageTypeSlug: "book",
  slug: "the-lost-fleet-courageous",
  title: "The Lost Fleet: Courageous",
  kind: "read",
  status: "not-started",
  author: "Jack Campbell",
  unitSlug: "words",
  position: 2,
  ownLength: 80500,
  source: "kindle",
  externalId: "B000UZNRXM",
  externalLink: "https://www.amazon.com/dp/B000UZNRXM",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
