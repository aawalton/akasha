import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aThousandLiTheFirstWar = {
  id: "019db533-f390-760d-baf5-22a6a82859e8",
  type: "page-type/book",
  slug: "a-thousand-li-the-first-war",
  title: "A Thousand Li: the First War",
  status: "completed",
  author: "Tao Wong",
  unit: "unit/words",
  position: 3,
  ownLength: 74750,
  ownProgress: 74750,
  publishedAt: "2020-04-01",
  partOfCollections: ["book-series/a-thousand-li"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B083GBL8XT",
      externalLink: "https://amazon.com/dp/B083GBL8XT",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
