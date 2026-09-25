import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const milesVorsokiganKomarr = {
  id: "019db533-f39a-7f05-b2f3-f77919a502fe",
  type: "page-type/book",
  slug: "miles-vorsokigan-komarr",
  title: "Miles Vorsokigan: Komarr",
  status: "not-started",
  unit: "unit/words",
  position: 10,
  ownLength: 83000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B005FRGCZA",
      externalLink: "https://www.amazon.com/dp/B005FRGCZA",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
