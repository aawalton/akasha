import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const heWhoFightsWithMonsters5 = {
  id: "019db533-f391-7082-b979-55df05c26972",
  type: "page-type/book",
  slug: "he-who-fights-with-monsters-5",
  title: "He Who Fights with Monsters 5",
  status: "completed",
  author: "Shirtaloon",
  unit: "unit/words",
  position: 5,
  ownLength: 152000,
  ownProgress: 152000,
  publishedAt: "2022-04-05",
  partOfCollections: ["book-series/he-who-fights-with-monsters"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09NF3WF1S",
      externalLink: "https://amazon.com/dp/B09NF3WF1S",
    },
  ],
} as const satisfies Book
