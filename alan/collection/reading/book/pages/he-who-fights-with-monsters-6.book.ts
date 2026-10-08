import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const heWhoFightsWithMonsters6 = {
  id: "019db533-f391-7077-9460-12b0352e2bb9",
  type: "page-type/book",
  slug: "he-who-fights-with-monsters-6",
  title: "He Who Fights with Monsters 6",
  status: "completed",
  author: "Shirtaloon",
  unit: "unit/words",
  position: 6,
  ownLength: 128000,
  ownProgress: 128000,
  publishedAt: "2022-06-28",
  partOfCollections: ["book-series/he-who-fights-with-monsters"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09VXWGNQH",
      externalLink: "https://amazon.com/dp/B09VXWGNQH",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
