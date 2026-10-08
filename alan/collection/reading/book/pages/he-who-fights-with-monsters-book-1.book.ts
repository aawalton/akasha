import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const heWhoFightsWithMonstersBook1 = {
  id: "019db533-f391-70c4-a602-e0ca755a203a",
  type: "page-type/book",
  slug: "he-who-fights-with-monsters-book-1",
  title: "He Who Fights with Monsters",
  status: "completed",
  author: "Shirtaloon",
  unit: "unit/words",
  position: 1,
  ownLength: 170000,
  ownProgress: 170000,
  publishedAt: "2021-03-09",
  partOfCollections: ["book-series/he-who-fights-with-monsters"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08WCT9W26",
      externalLink: "https://amazon.com/dp/B08WCT9W26",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
