import type { Book } from "../../book.page-type.ts"

export const cradleWaybound = {
  id: "019db533-f390-7bd0-a0f3-4dea5172f43f",
  pageTypeSlug: "book",
  slug: "cradle-waybound",
  title: "Cradle: Waybound",
  kind: "read",
  status: "completed",
  author: "Will Wight",
  unitSlug: "words",
  position: 12,
  ownLength: 129500,
  ownProgress: 129500,
  publishedAt: "2023-06-04",
  partOfSlugs: ["book-series/cradle"],
  source: "kindle",
  externalId: "B0C738F623",
  externalLink: "https://amazon.com/dp/B0C738F623",
} as const satisfies Book
