import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aThousandLiTheFourthFall = {
  id: "019db533-f390-75ce-9404-cafe03168dc8",
  type: "page-type/book",
  slug: "a-thousand-li-the-fourth-fall",
  title: "A Thousand Li: the Fourth Fall",
  status: "completed",
  author: "Tao Wong",
  unit: "unit/words",
  position: 11,
  ownLength: 119250,
  ownProgress: 119250,
  publishedAt: "2024-11-01",
  partOfCollections: ["book-series/a-thousand-li"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CW173YZX",
      externalLink: "https://amazon.com/dp/B0CW173YZX",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
