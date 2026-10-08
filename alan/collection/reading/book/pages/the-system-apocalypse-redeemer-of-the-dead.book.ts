import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSystemApocalypseRedeemerOfTheDead = {
  id: "019db533-f391-7bfe-b901-3d0ac8fc594c",
  type: "page-type/book",
  slug: "the-system-apocalypse-redeemer-of-the-dead",
  title: "The System Apocalypse: Redeemer of the Dead",
  status: "completed",
  author: "Tao Wong",
  unit: "unit/words",
  position: 2,
  ownLength: 80250,
  ownProgress: 80250,
  publishedAt: "2017-10-24",
  partOfCollections: ["book-series/the-system-apocalypse"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B075NR9RCH",
      externalLink: "https://amazon.com/dp/B075NR9RCH",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
