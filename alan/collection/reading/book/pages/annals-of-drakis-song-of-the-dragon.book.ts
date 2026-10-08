import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const annalsOfDrakisSongOfTheDragon = {
  id: "019db533-f39a-7aae-b22c-e3549cf363d5",
  type: "page-type/book",
  slug: "annals-of-drakis-song-of-the-dragon",
  title: "Annals of Drakis: Song of the Dragon",
  status: "not-started",
  author: "Tracy Hickman",
  unit: "unit/words",
  ownLength: 116500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0057Z1U5C",
      externalLink: "https://www.amazon.com/dp/B0057Z1U5C",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
