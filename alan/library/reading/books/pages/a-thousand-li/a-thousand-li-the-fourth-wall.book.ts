import type { Book } from "../../book.page-type.ts"

export const aThousandLiTheFourthWall = {
  id: "019db533-f390-75dd-b8fe-92d68bdfedba",
  pageTypeSlug: "book",
  slug: "a-thousand-li-the-fourth-wall",
  title: "A Thousand Li: the Fourth Wall",
  kind: "read",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 12,
  ownLength: 116750,
  ownProgress: 116750,
  publishedAt: "2025-07-01",
  partOfSlugs: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B0DL6RRVZP",
  externalLink: "https://amazon.com/dp/B0DL6RRVZP",
} as const satisfies Book
