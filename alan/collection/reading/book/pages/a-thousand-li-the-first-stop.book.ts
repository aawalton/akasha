import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aThousandLiTheFirstStop = {
  id: "019db533-f390-763a-adbf-e4a44df9a6df",
  type: "page-type/book",
  slug: "a-thousand-li-the-first-stop",
  title: "A Thousand Li: the First Stop",
  status: "completed",
  author: "Tao Wong",
  unit: "unit/words",
  position: 2,
  ownLength: 79500,
  ownProgress: 79500,
  publishedAt: "2019-08-01",
  partOfCollections: ["book-series/a-thousand-li"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07TSFN7GD",
      externalLink: "https://amazon.com/dp/B07TSFN7GD",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
