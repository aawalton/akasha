import type { Book } from "../../book.page-type.ts"

export const cradleUnsouled = {
  id: "019db533-f390-7c3b-a541-304ae837d20a",
  pageTypeSlug: "book",
  slug: "cradle-unsouled",
  title: "Cradle: Unsouled",
  status: "completed",
  author: "Will Wight",
  unitSlug: "words",
  position: 1,
  ownLength: 72750,
  ownProgress: 72750,
  publishedAt: "2016-06-13",
  partOfSlugs: ["book-series/cradle"],
  source: "kindle",
  externalId: "B01H1CYBS6",
  externalLink: "https://amazon.com/dp/B01H1CYBS6",
} as const satisfies Book
