import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const defianceOfTheFall3 = {
  id: "019db533-f390-7d0f-af7b-5f5e34115c91",
  type: "page-type/book",
  slug: "defiance-of-the-fall-3",
  title: "Defiance of the Fall 3",
  status: "completed",
  author: "J. F. Brink",
  unit: "unit/words",
  position: 3,
  ownLength: 182500,
  ownProgress: 182500,
  publishedAt: "2021-11-30",
  partOfCollections: ["book-series/defiance-of-the-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09BLG8D3D",
      externalLink: "https://amazon.com/dp/B09BLG8D3D",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
