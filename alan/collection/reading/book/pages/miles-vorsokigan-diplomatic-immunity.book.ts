import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganDiplomaticImmunity = {
  id: "019db533-f39b-7164-88db-ff8394973798",
  type: "page-type/book",
  slug: "miles-vorsokigan-diplomatic-immunity",
  title: "Miles Vorsokigan: Diplomatic Immunity",
  status: "not-started",
  unit: "unit/words",
  position: 12,
  ownLength: 89250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005GLJD7E",
      externalLink: "https://www.amazon.com/dp/B005GLJD7E",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
