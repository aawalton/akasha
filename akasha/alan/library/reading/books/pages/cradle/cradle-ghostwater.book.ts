import type { Book } from "../../book.page-type.ts"

export const cradleGhostwater = {
  id: "019db533-f390-7c1e-9a45-120237365fb6",
  pageTypeSlug: "book",
  slug: "cradle-ghostwater",
  title: "Cradle: Ghostwater",
  kind: "read",
  status: "completed",
  author: "Will Wight",
  unitSlug: "words",
  position: 5,
  ownLength: 76250,
  ownProgress: 76250,
  publishedAt: "2018-05-31",
  partOfSlugs: ["book-series/cradle"],
  source: "kindle",
  externalId: "B07DFWZP9C",
  externalLink: "https://amazon.com/dp/B07DFWZP9C",
} as const satisfies Book
