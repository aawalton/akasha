import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSpokenMagePowerOfPenAndVoice = {
  id: "019db533-f39a-7c84-ad7d-f768d2fedde5",
  type: "page-type/book",
  slug: "the-spoken-mage-power-of-pen-and-voice",
  title: "The Spoken Mage: Power of Pen and Voice",
  status: "not-started",
  unit: "unit/words",
  position: 4,
  ownLength: 67500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08G219MTL",
      externalLink: "https://www.amazon.com/dp/B08G219MTL",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
