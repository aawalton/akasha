import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const shrubleyTheMonsterAdventurer2 = {
  id: "019db533-f38a-747d-bd1d-051e6580b9cf",
  type: "page-type/book",
  slug: "shrubley-the-monster-adventurer-2",
  title: "Shrubley, The Monster Adventurer 2",
  status: "completed",
  grade: "C",
  unit: "unit/words",
  position: 2,
  ownLength: 130000,
  ownProgress: 130000,
  publishedAt: "2024-07-05",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D7Y9F5J1",
      externalLink: "https://amazon.com/dp/B0D7Y9F5J1",
    },
  ],
} as const satisfies Book
