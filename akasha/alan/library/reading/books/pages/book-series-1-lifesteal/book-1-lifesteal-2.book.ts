import type { Book } from "../../book.page-type.ts"

export const book1Lifesteal2 = {
  id: "019db533-f390-7597-810b-bc3f1c5bb212",
  pageTypeSlug: "book",
  slug: "book-1-lifesteal-2",
  title: "1% Lifesteal 2",
  kind: "read",
  status: "not-started",
  author: "Edward Cuthbert Butler",
  unitSlug: "words",
  position: 2,
  ownLength: 180500,
  publishedAt: "2025-06-18",
  partOfSlugs: ["book-series-1-lifesteal"],
  source: "kindle",
  externalId: "B0DYPKC21K",
  externalLink: "https://amazon.com/dp/B0DYPKC21K",
} as const satisfies Book
