import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cradleDreadgod = {
  id: "019db533-f390-7bdf-9d97-3da35d04868a",
  type: "page-type/book",
  slug: "cradle-dreadgod",
  title: "Cradle: Dreadgod",
  status: "completed",
  author: "Will Wight",
  unit: "unit/words",
  position: 11,
  ownLength: 121500,
  ownProgress: 121500,
  publishedAt: "2022-07-05",
  partOfCollections: ["book-series/cradle"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B4MY8PN8",
      externalLink: "https://amazon.com/dp/B0B4MY8PN8",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
