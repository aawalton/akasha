import type { Book } from "../../book.page-type.ts"

export const cradleUnderlord = {
  id: "019db533-f390-7c4a-bcbb-0cf3472acdd0",
  pageTypeSlug: "book",
  slug: "cradle-underlord",
  title: "Cradle: Underlord",
  kind: "read",
  status: "completed",
  author: "Will Wight",
  unitSlug: "words",
  position: 6,
  ownLength: 100000,
  ownProgress: 100000,
  publishedAt: "2019-03-01",
  partOfSlugs: ["book-series/cradle"],
  source: "kindle",
  externalId: "B07NJ3B6HN",
  externalLink: "https://amazon.com/dp/B07NJ3B6HN",
} as const satisfies Book
