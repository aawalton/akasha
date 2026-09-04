import type { Book } from "../../book.page-type.ts"

export const defianceOfTheFallBook1 = {
  id: "019db533-f390-7d27-b19f-834354ce0391",
  pageTypeSlug: "book",
  slug: "defiance-of-the-fall-book-1",
  title: "Defiance of the Fall",
  status: "completed",
  author: "J. F. Brink",
  unitSlug: "words",
  position: 1,
  ownLength: 194500,
  ownProgress: 194500,
  publishedAt: "2021-06-08",
  partOfSlugs: ["book-series/defiance-of-the-fall"],
  source: "kindle",
  externalId: "B09168R29M",
  externalLink: "https://amazon.com/dp/B09168R29M",
} as const satisfies Book
