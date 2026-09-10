import type { Book } from "../book.page-type.types.ts"

export const theLostFleetVictorious = {
  id: "019db533-f39a-7880-a5d4-74315f02ad39",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-lost-fleet-victorious",
  title: "The Lost Fleet: Victorious",
  status: "not-started",
  author: "Jack Campbell",
  unit: "words",
  position: 5,
  ownLength: 88500,
  source: "kindle",
  externalId: "B003NX7OLO",
  externalLink: "https://www.amazon.com/dp/B003NX7OLO",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
