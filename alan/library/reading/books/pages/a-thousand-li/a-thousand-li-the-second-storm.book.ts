import type { Book } from "../../book.page-type.ts"

export const aThousandLiTheSecondStorm = {
  id: "019db533-f390-7623-a253-a1820da7af84",
  pageTypeSlug: "book",
  slug: "a-thousand-li-the-second-storm",
  title: "A Thousand Li: The Second Storm",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 6,
  ownLength: 87500,
  ownProgress: 87500,
  publishedAt: "2021-12-01",
  partOfSlugs: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B09H5Z9LP1",
  externalLink: "https://amazon.com/dp/B09H5Z9LP1",
} as const satisfies Book
