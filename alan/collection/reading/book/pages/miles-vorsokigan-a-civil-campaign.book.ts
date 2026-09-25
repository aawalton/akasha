import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganACivilCampaign = {
  id: "019db533-f39b-743d-9bca-8b1efc617794",
  type: "page-type/book",
  slug: "miles-vorsokigan-a-civil-campaign",
  title: "Miles Vorsokigan: A Civil Campaign",
  status: "not-started",
  unit: "unit/words",
  position: 11,
  ownLength: 107000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005FSI1IK",
      externalLink: "https://www.amazon.com/dp/B005FSI1IK",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
