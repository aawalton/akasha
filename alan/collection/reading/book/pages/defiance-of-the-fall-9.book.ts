import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const defianceOfTheFall9 = {
  id: "019db533-f390-7cce-a448-7048c9fa8dce",
  type: "page-type/book",
  slug: "defiance-of-the-fall-9",
  title: "Defiance of the Fall 9",
  status: "completed",
  author: "J. F. Brink",
  unit: "unit/words",
  position: 9,
  ownLength: 161000,
  ownProgress: 161000,
  publishedAt: "2023-04-26",
  partOfCollections: ["book-series/defiance-of-the-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BSG29WY7",
      externalLink: "https://amazon.com/dp/B0BSG29WY7",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
