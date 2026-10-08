import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aThousandLiTheFourthWall = {
  id: "019db533-f390-75dd-b8fe-92d68bdfedba",
  type: "page-type/book",
  slug: "a-thousand-li-the-fourth-wall",
  title: "A Thousand Li: the Fourth Wall",
  status: "completed",
  author: "Tao Wong",
  unit: "unit/words",
  position: 12,
  ownLength: 116750,
  ownProgress: 116750,
  publishedAt: "2025-07-01",
  partOfCollections: ["book-series/a-thousand-li"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DL6RRVZP",
      externalLink: "https://amazon.com/dp/B0DL6RRVZP",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
