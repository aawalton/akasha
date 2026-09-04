import type { Book } from "../../book.page-type.ts"

export const cradleUncrowned = {
  id: "019db533-f390-7c0f-bfc8-43ee91e0074d",
  pageTypeSlug: "book",
  slug: "cradle-uncrowned",
  title: "Cradle: Uncrowned",
  status: "completed",
  author: "Will Wight",
  unitSlug: "words",
  position: 7,
  ownLength: 94000,
  ownProgress: 94000,
  publishedAt: "2019-09-26",
  partOfSlugs: ["book-series/cradle"],
  source: "kindle",
  externalId: "B07X8ZH6BS",
  externalLink: "https://amazon.com/dp/B07X8ZH6BS",
} as const satisfies Book
