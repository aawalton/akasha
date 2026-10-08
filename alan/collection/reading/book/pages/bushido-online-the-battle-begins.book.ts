import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bushidoOnlineTheBattleBegins = {
  id: "019db533-f390-7a51-8036-812d4322c92c",
  type: "page-type/book",
  slug: "bushido-online-the-battle-begins",
  title: "Bushido Online: the Battle Begins",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 82250,
  ownProgress: 82250,
  publishedAt: "2017-08-31",
  partOfCollections: ["book-series/bushido-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0759XBQNW",
      externalLink: "https://amazon.com/dp/B0759XBQNW",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
