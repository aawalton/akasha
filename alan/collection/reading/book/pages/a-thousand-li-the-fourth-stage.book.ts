import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aThousandLiTheFourthStage = {
  id: "019db533-f390-75bf-a9eb-b537186f10e2",
  type: "page-type/book",
  slug: "a-thousand-li-the-fourth-stage",
  title: "A Thousand Li: the Fourth Stage",
  status: "completed",
  author: "Tao Wong",
  unit: "unit/words",
  position: 10,
  ownLength: 109750,
  ownProgress: 109750,
  publishedAt: "2024-03-01",
  partOfCollections: ["book-series/a-thousand-li"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CDBBCJSJ",
      externalLink: "https://amazon.com/dp/B0CDBBCJSJ",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
