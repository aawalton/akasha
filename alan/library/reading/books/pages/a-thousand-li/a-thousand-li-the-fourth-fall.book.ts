import type { Book } from "../../book.page-type.ts"

export const aThousandLiTheFourthFall = {
  id: "019db533-f390-75ce-9404-cafe03168dc8",
  pageTypeSlug: "book",
  slug: "a-thousand-li-the-fourth-fall",
  title: "A Thousand Li: the Fourth Fall",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 11,
  ownLength: 119250,
  ownProgress: 119250,
  publishedAt: "2024-11-01",
  partOfSlugs: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B0CW173YZX",
  externalLink: "https://amazon.com/dp/B0CW173YZX",
} as const satisfies Book
