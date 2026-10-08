import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const heWhoFightsWithMonsters9 = {
  id: "019db533-f391-708e-90bb-a49f15b3412c",
  type: "page-type/book",
  slug: "he-who-fights-with-monsters-9",
  title: "He Who Fights with Monsters 9",
  status: "completed",
  author: "Shirtaloon, Travis Deverell",
  unit: "unit/words",
  position: 9,
  ownLength: 165500,
  ownProgress: 165500,
  publishedAt: "2023-04-18",
  partOfCollections: ["book-series/he-who-fights-with-monsters"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BNLMTBR4",
      externalLink: "https://amazon.com/dp/B0BNLMTBR4",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
