import type { Book } from "../../book.page-type.ts"

export const motherOfLearning2 = {
  id: "019db533-f391-7345-80a0-57509c56012e",
  pageTypeSlug: "book",
  slug: "mother-of-learning-2",
  title: "Mother of Learning 2",
  kind: "read",
  status: "completed",
  author: "James McBride",
  unitSlug: "words",
  position: 2,
  ownLength: 166000,
  ownProgress: 166000,
  publishedAt: "2022-05-17",
  partOfSlugs: ["book-series/mother-of-learning"],
  source: "kindle",
  externalId: "B0B11L9TWP",
  externalLink: "https://amazon.com/dp/B0B11L9TWP",
} as const satisfies Book
