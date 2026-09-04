import type { Book } from "../../book.page-type.ts"

export const aThousandLiTheSecondSect = {
  id: "019db533-f390-7618-bc01-45777a71a3e7",
  pageTypeSlug: "book",
  slug: "a-thousand-li-the-second-sect",
  title: "A Thousand Li: The Second Sect",
  kind: "read",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 5,
  ownLength: 100750,
  ownProgress: 100750,
  publishedAt: "2021-06-01",
  partOfSlugs: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B092RMQ97X",
  externalLink: "https://amazon.com/dp/B092RMQ97X",
} as const satisfies Book
