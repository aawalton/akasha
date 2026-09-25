import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const heWhoFightsWithMonsters8 = {
  id: "019db533-f391-7054-a2fe-e3b6d3d45233",
  type: "page-type/book",
  slug: "he-who-fights-with-monsters-8",
  title: "He Who Fights with Monsters 8",
  status: "completed",
  author: "Shirtaloon",
  unit: "unit/words",
  position: 8,
  ownLength: 156000,
  ownProgress: 156000,
  publishedAt: "2022-12-13",
  partOfCollections: ["book-series/he-who-fights-with-monsters"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BBWK3T9T",
      externalLink: "https://amazon.com/dp/B0BBWK3T9T",
    },
  ],
} as const satisfies Book
