import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const defianceOfTheFall8 = {
  id: "019db533-f390-7cf4-999a-9a0863355743",
  type: "page-type/book",
  slug: "defiance-of-the-fall-8",
  title: "Defiance of the Fall 8",
  status: "completed",
  author: "J. F. Brink",
  unit: "unit/words",
  position: 8,
  ownLength: 164000,
  ownProgress: 164000,
  publishedAt: "2023-01-24",
  partOfCollections: ["book-series/defiance-of-the-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BHXCVRNL",
      externalLink: "https://amazon.com/dp/B0BHXCVRNL",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
