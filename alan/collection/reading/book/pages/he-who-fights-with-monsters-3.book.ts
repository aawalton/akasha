import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const heWhoFightsWithMonsters3 = {
  id: "019db533-f391-70b5-bf08-88fc52bf9908",
  type: "page-type/book",
  slug: "he-who-fights-with-monsters-3",
  title: "He Who Fights with Monsters 3",
  status: "completed",
  author: "Shirtaloon",
  unit: "unit/words",
  position: 3,
  ownLength: 180500,
  ownProgress: 180500,
  publishedAt: "2021-09-07",
  partOfCollections: ["book-series/he-who-fights-with-monsters"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09443F69P",
      externalLink: "https://amazon.com/dp/B09443F69P",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
