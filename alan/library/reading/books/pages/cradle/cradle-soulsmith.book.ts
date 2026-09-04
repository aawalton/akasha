import type { Book } from "../../book.page-type.ts"

export const cradleSoulsmith = {
  id: "019db533-f390-7c57-9fd3-517a41011440",
  pageTypeSlug: "book",
  slug: "cradle-soulsmith",
  title: "Cradle: Soulsmith",
  kind: "read",
  status: "completed",
  author: "Will Wight",
  unitSlug: "words",
  position: 2,
  ownLength: 70500,
  ownProgress: 70500,
  publishedAt: "2016-09-26",
  partOfSlugs: ["book-series/cradle"],
  source: "kindle",
  externalId: "B01M09PWJQ",
  externalLink: "https://amazon.com/dp/B01M09PWJQ",
} as const satisfies Book
