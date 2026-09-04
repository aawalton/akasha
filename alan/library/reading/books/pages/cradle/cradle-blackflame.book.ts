import type { Book } from "../../book.page-type.ts"

export const cradleBlackflame = {
  id: "019db533-f390-7c2d-86de-57c396eae142",
  pageTypeSlug: "book",
  slug: "cradle-blackflame",
  title: "Cradle: Blackflame",
  kind: "read",
  status: "completed",
  author: "Will Wight",
  unitSlug: "words",
  position: 3,
  ownLength: 92250,
  ownProgress: 92250,
  publishedAt: "2017-04-30",
  partOfSlugs: ["book-series/cradle"],
  source: "kindle",
  externalId: "B0716GZ8QX",
  externalLink: "https://amazon.com/dp/B0716GZ8QX",
} as const satisfies Book
