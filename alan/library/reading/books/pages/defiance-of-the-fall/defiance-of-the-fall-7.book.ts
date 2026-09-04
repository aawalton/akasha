import type { Book } from "../../book.page-type.ts"

export const defianceOfTheFall7 = {
  id: "019db533-f390-7ce9-b56a-a95254906004",
  pageTypeSlug: "book",
  slug: "defiance-of-the-fall-7",
  title: "Defiance of the Fall 7",
  kind: "read",
  status: "completed",
  author: "J. F. Brink",
  unitSlug: "words",
  position: 7,
  ownLength: 168000,
  ownProgress: 168000,
  publishedAt: "2022-10-26",
  partOfSlugs: ["book-series/defiance-of-the-fall"],
  source: "kindle",
  externalId: "B0B8F6D8W8",
  externalLink: "https://amazon.com/dp/B0B8F6D8W8",
} as const satisfies Book
