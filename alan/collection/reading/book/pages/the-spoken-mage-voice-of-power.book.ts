import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSpokenMageVoiceOfPower = {
  id: "019db533-f39a-78cc-9594-26d4a0b2bb1b",
  type: "page-type/book",
  slug: "the-spoken-mage-voice-of-power",
  title: "The Spoken Mage: Voice of Power",
  status: "not-started",
  unit: "unit/words",
  ownLength: 78500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07LDST8NX",
      externalLink: "https://www.amazon.com/dp/B07LDST8NX",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
