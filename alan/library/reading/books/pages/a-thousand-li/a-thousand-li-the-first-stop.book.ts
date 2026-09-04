import type { Book } from "../../book.page-type.ts"

export const aThousandLiTheFirstStop = {
  id: "019db533-f390-763a-adbf-e4a44df9a6df",
  pageTypeSlug: "book",
  slug: "a-thousand-li-the-first-stop",
  title: "A Thousand Li: the First Stop",
  kind: "read",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 2,
  ownLength: 79500,
  ownProgress: 79500,
  publishedAt: "2019-08-01",
  partOfSlugs: ["book-series/a-thousand-li"],
  source: "kindle",
  externalId: "B07TSFN7GD",
  externalLink: "https://amazon.com/dp/B07TSFN7GD",
} as const satisfies Book
