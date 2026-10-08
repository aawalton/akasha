import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const powderMageTheCrimsonCampaign = {
  id: "019db533-f39a-7b1c-98d1-f558280da41e",
  type: "page-type/book",
  slug: "powder-mage-the-crimson-campaign",
  title: "Powder Mage: The Crimson Campaign",
  status: "not-started",
  author: "Brian McClellan",
  unit: "unit/words",
  position: 1,
  ownLength: 157000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00CO7FI36",
      externalLink: "https://www.amazon.com/dp/B00CO7FI36",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
