import type { Book } from "../../book.page-type.ts"

export const defianceOfTheFall10 = {
  id: "019db533-f390-7cda-9593-fdf2feaab1f3",
  pageTypeSlug: "book",
  slug: "defiance-of-the-fall-10",
  title: "Defiance of the Fall 10",
  status: "completed",
  author: "J. F. Brink",
  unitSlug: "words",
  position: 10,
  ownLength: 141000,
  ownProgress: 141000,
  publishedAt: "2023-08-02",
  partOfSlugs: ["book-series/defiance-of-the-fall"],
  source: "kindle",
  externalId: "B0C2QP39F5",
  externalLink: "https://amazon.com/dp/B0C2QP39F5",
} as const satisfies Book
