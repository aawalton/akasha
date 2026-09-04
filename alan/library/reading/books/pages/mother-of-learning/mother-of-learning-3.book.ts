import type { Book } from "../../book.page-type.ts"

export const motherOfLearning3 = {
  id: "019db533-f391-733a-bb59-e115740911fd",
  pageTypeSlug: "book",
  slug: "mother-of-learning-3",
  title: "Mother of Learning 3",
  kind: "read",
  status: "completed",
  author: "James McBride",
  unitSlug: "words",
  position: 3,
  ownLength: 185750,
  ownProgress: 185750,
  publishedAt: "2022-09-06",
  partOfSlugs: ["book-series/mother-of-learning"],
  source: "kindle",
  externalId: "B0BCGMW45C",
  externalLink: "https://amazon.com/dp/B0BCGMW45C",
} as const satisfies Book
