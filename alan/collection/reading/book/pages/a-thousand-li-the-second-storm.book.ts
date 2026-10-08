import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aThousandLiTheSecondStorm = {
  id: "019db533-f390-7623-a253-a1820da7af84",
  type: "page-type/book",
  slug: "a-thousand-li-the-second-storm",
  title: "A Thousand Li: The Second Storm",
  status: "completed",
  author: "Tao Wong",
  unit: "unit/words",
  position: 6,
  ownLength: 87500,
  ownProgress: 87500,
  publishedAt: "2021-12-01",
  partOfCollections: ["book-series/a-thousand-li"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09H5Z9LP1",
      externalLink: "https://amazon.com/dp/B09H5Z9LP1",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
