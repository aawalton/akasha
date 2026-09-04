import type { Book } from "../../book.page-type.ts"

export const cradleDreadgod = {
  id: "019db533-f390-7bdf-9d97-3da35d04868a",
  pageTypeSlug: "book",
  slug: "cradle-dreadgod",
  title: "Cradle: Dreadgod",
  status: "completed",
  author: "Will Wight",
  unitSlug: "words",
  position: 11,
  ownLength: 121500,
  ownProgress: 121500,
  publishedAt: "2022-07-05",
  partOfSlugs: ["book-series/cradle"],
  source: "kindle",
  externalId: "B0B4MY8PN8",
  externalLink: "https://amazon.com/dp/B0B4MY8PN8",
} as const satisfies Book
