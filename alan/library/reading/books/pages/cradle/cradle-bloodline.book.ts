import type { Book } from "../../book.page-type.ts"

export const cradleBloodline = {
  id: "019db533-f390-7be7-bf51-c7f74dee97eb",
  pageTypeSlug: "book",
  slug: "cradle-bloodline",
  title: "Cradle: Bloodline",
  status: "completed",
  author: "Will Wight",
  unitSlug: "words",
  position: 9,
  ownLength: 500000,
  ownProgress: 500000,
  publishedAt: "2021-04-06",
  partOfSlugs: ["book-series/cradle"],
  source: "kindle",
  externalId: "B08ZS19WWY",
  externalLink: "https://amazon.com/dp/B08ZS19WWY",
} as const satisfies Book
