import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSpokenMageVoiceOfDominion = {
  id: "019db533-f39a-786f-bfc9-11611d23b008",
  type: "page-type/book",
  slug: "the-spoken-mage-voice-of-dominion",
  title: "The Spoken Mage: Voice of Dominion",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 79500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07MYPB5RN",
      externalLink: "https://www.amazon.com/dp/B07MYPB5RN",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
