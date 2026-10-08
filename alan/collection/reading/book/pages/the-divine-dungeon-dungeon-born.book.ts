import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theDivineDungeonDungeonBorn = {
  id: "019db533-f391-78e4-9450-9b4e8c855fae",
  type: "page-type/book",
  slug: "the-divine-dungeon-dungeon-born",
  title: "The Divine Dungeon: Dungeon Born",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 92500,
  ownProgress: 92500,
  publishedAt: "2019-05-09",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07RR97GXF",
      externalLink: "https://amazon.com/dp/B07RR97GXF",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
