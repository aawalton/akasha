import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldSoulMusic = {
  id: "019db533-f39a-7b11-ae36-5390de8f7987",
  type: "page-type/book",
  slug: "discworld-soul-music",
  title: "Discworld: Soul Music",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 16,
  ownLength: 96750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B004478AFW",
      externalLink: "https://www.amazon.com/dp/B004478AFW",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
