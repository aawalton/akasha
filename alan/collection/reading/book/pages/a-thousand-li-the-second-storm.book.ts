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
} as const satisfies Book
