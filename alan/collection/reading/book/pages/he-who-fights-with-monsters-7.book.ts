import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const heWhoFightsWithMonsters7 = {
  id: "019db533-f391-7060-8836-35b4436529c4",
  type: "page-type/book",
  slug: "he-who-fights-with-monsters-7",
  title: "He Who Fights with Monsters 7",
  status: "completed",
  author: "Shirtaloon",
  unit: "unit/words",
  position: 7,
  ownLength: 155500,
  ownProgress: 155500,
  publishedAt: "2022-09-13",
  partOfCollections: ["book-series/he-who-fights-with-monsters"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B4KSR9HT",
      externalLink: "https://amazon.com/dp/B0B4KSR9HT",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
