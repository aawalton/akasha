import type { Book } from "../book.page-type.types.ts"

export const aThousandLiTheFourthWall = {
  id: "019db533-f390-75dd-b8fe-92d68bdfedba",
  pageTypeSlug: "book",
  type: "book",
  slug: "a-thousand-li-the-fourth-wall",
  title: "A Thousand Li: the Fourth Wall",
  status: "completed",
  author: "Tao Wong",
  unit: "words",
  position: 12,
  ownLength: 116750,
  ownProgress: 116750,
  publishedAt: "2025-07-01",
  partOfCollections: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B0DL6RRVZP",
  externalLink: "https://amazon.com/dp/B0DL6RRVZP",
} as const satisfies Book
