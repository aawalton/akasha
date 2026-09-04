import type { Book } from "../../book.page-type.ts"

export const aThousandLiTheFirstWar = {
  id: "019db533-f390-760d-baf5-22a6a82859e8",
  pageTypeSlug: "book",
  slug: "a-thousand-li-the-first-war",
  title: "A Thousand Li: the First War",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 3,
  ownLength: 74750,
  ownProgress: 74750,
  publishedAt: "2020-04-01",
  partOfSlugs: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B083GBL8XT",
  externalLink: "https://amazon.com/dp/B083GBL8XT",
} as const satisfies Book
