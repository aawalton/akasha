import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const markOfTheFoolBook1 = {
  id: "019db533-f391-726a-a0c1-5b86785a9e76",
  type: "page-type/book",
  slug: "mark-of-the-fool-book-1",
  title: "Mark of the Fool",
  status: "completed",
  author: "J.M. Clarke",
  unit: "unit/words",
  position: 1,
  ownLength: 174500,
  ownProgress: 174500,
  publishedAt: "2022-09-20",
  partOfCollections: ["book-series/mark-of-the-fool"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B134YJYF",
      externalLink: "https://amazon.com/dp/B0B134YJYF",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
