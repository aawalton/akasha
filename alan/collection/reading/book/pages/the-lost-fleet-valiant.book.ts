import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLostFleetValiant = {
  id: "019db533-f39a-7974-a525-b216044eeaee",
  type: "page-type/book",
  slug: "the-lost-fleet-valiant",
  title: "The Lost Fleet: Valiant",
  status: "not-started",
  author: "Jack Campbell",
  unit: "unit/words",
  position: 3,
  ownLength: 82750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00125L88K",
      externalLink: "https://www.amazon.com/dp/B00125L88K",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
