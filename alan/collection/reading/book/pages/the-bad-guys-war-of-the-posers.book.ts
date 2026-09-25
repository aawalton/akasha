import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBadGuysWarOfThePosers = {
  id: "019db533-f391-77ad-bb9c-fabfbf234620",
  type: "page-type/book",
  slug: "the-bad-guys-war-of-the-posers",
  title: "The Bad Guys: War of the Posers",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 114500,
  ownProgress: 114500,
  publishedAt: "2020-08-08",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B084DW7W4M",
      externalLink: "https://amazon.com/dp/B084DW7W4M",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
