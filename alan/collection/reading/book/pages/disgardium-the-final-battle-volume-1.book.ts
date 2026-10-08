import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const disgardiumTheFinalBattleVolume1 = {
  id: "019db533-f390-7d4a-b97e-fd1ddd888164",
  type: "page-type/book",
  slug: "disgardium-the-final-battle-volume-1",
  title: "Disgardium: The Final Battle Volume 1",
  status: "not-started",
  unit: "unit/words",
  position: 14,
  ownLength: 136250,
  publishedAt: "2025-04-09",
  partOfCollections: ["book-series/disgardium"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DYKP2KWM",
      externalLink: "https://amazon.com/dp/B0DYKP2KWM",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
