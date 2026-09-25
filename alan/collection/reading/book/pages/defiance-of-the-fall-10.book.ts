import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const defianceOfTheFall10 = {
  id: "019db533-f390-7cda-9593-fdf2feaab1f3",
  type: "page-type/book",
  slug: "defiance-of-the-fall-10",
  title: "Defiance of the Fall 10",
  status: "completed",
  author: "J. F. Brink",
  unit: "unit/words",
  position: 10,
  ownLength: 141000,
  ownProgress: 141000,
  publishedAt: "2023-08-02",
  partOfCollections: ["book-series/defiance-of-the-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C2QP39F5",
      externalLink: "https://amazon.com/dp/B0C2QP39F5",
    },
  ],
} as const satisfies Book
