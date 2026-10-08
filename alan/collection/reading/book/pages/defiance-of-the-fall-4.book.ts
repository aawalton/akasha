import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const defianceOfTheFall4 = {
  id: "019db533-f390-7d3e-9787-34f22ed8924e",
  type: "page-type/book",
  slug: "defiance-of-the-fall-4",
  title: "Defiance of the Fall 4",
  status: "completed",
  author: "J. F. Brink",
  unit: "unit/words",
  position: 4,
  ownLength: 169500,
  ownProgress: 169500,
  publishedAt: "2022-02-22",
  partOfCollections: ["book-series/defiance-of-the-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09M8TFHM7",
      externalLink: "https://amazon.com/dp/B09M8TFHM7",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
