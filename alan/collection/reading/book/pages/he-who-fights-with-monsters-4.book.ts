import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const heWhoFightsWithMonsters4 = {
  id: "019db533-f391-70d0-b474-1047da409faa",
  type: "page-type/book",
  slug: "he-who-fights-with-monsters-4",
  title: "He Who Fights with Monsters 4",
  status: "completed",
  author: "Shirtaloon",
  unit: "unit/words",
  position: 4,
  ownLength: 167500,
  ownProgress: 167500,
  publishedAt: "2021-12-28",
  partOfCollections: ["book-series/he-who-fights-with-monsters"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09D2B9G48",
      externalLink: "https://amazon.com/dp/B09D2B9G48",
    },
  ],
} as const satisfies Book
