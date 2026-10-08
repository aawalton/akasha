import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const defianceOfTheFall11 = {
  id: "019db533-f390-7cbf-a84e-3b518119c545",
  type: "page-type/book",
  slug: "defiance-of-the-fall-11",
  title: "Defiance of the Fall 11",
  status: "completed",
  author: "J. F. Brink",
  unit: "unit/words",
  position: 11,
  ownLength: 165500,
  ownProgress: 165500,
  publishedAt: "2023-11-01",
  partOfCollections: ["book-series/defiance-of-the-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CCSPCRPB",
      externalLink: "https://amazon.com/dp/B0CCSPCRPB",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
