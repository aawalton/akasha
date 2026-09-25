import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theDivineDungeonDungeonEternium = {
  id: "019db533-f391-78c3-9fe6-1cefd23ed433",
  type: "page-type/book",
  slug: "the-divine-dungeon-dungeon-eternium",
  title: "The Divine Dungeon: Dungeon Eternium",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 82000,
  ownProgress: 82000,
  publishedAt: "2019-05-31",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07RPB6495",
      externalLink: "https://amazon.com/dp/B07RPB6495",
    },
  ],
} as const satisfies Book
