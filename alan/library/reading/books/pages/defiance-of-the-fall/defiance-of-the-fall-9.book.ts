import type { Book } from "../../book.page-type.ts"

export const defianceOfTheFall9 = {
  id: "019db533-f390-7cce-a448-7048c9fa8dce",
  pageTypeSlug: "book",
  slug: "defiance-of-the-fall-9",
  title: "Defiance of the Fall 9",
  kind: "read",
  status: "completed",
  author: "J. F. Brink",
  unitSlug: "words",
  position: 9,
  ownLength: 161000,
  ownProgress: 161000,
  publishedAt: "2023-04-26",
  partOfSlugs: ["book-series/defiance-of-the-fall"],
  source: "kindle",
  externalId: "B0BSG29WY7",
  externalLink: "https://amazon.com/dp/B0BSG29WY7",
} as const satisfies Book
