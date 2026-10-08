import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aThousandLiTheThirdKingdom = {
  id: "019db533-f390-75b0-a8c6-3e59afdf89c3",
  type: "page-type/book",
  slug: "a-thousand-li-the-third-kingdom",
  title: "A Thousand Li: The Third Kingdom",
  status: "completed",
  author: "Bible",
  unit: "unit/words",
  position: 7,
  ownLength: 98250,
  ownProgress: 98250,
  publishedAt: "2022-07-01",
  partOfCollections: ["book-series/a-thousand-li"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B2KMFK8D",
      externalLink: "https://amazon.com/dp/B0B2KMFK8D",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
