import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bornInTheApocalypse = {
  id: "019db533-f390-7a20-a7ef-77bd374e08a9",
  type: "page-type/book",
  slug: "born-in-the-apocalypse",
  title: "Born in the Apocalypse",
  status: "not-started",
  author: "Joseph Talluto",
  unit: "unit/words",
  position: 1,
  ownLength: 53500,
  publishedAt: "2016-03-20",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01D7ZF4P0",
      externalLink: "https://amazon.com/dp/B01D7ZF4P0",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
