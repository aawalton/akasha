import type { Book } from "../../book.page-type.ts"

export const book1Lifesteal3 = {
  id: "019db533-f390-75a2-920d-e8ef6ccf26b1",
  pageTypeSlug: "book",
  slug: "book-1-lifesteal-3",
  title: "1% Lifesteal 3",
  status: "not-started",
  author: "Edward Cuthbert Butler",
  unitSlug: "words",
  position: 3,
  ownLength: 205500,
  publishedAt: "2025-09-17",
  partOfSlugs: ["book-series-1-lifesteal"],
  source: "kindle",
  externalId: "B0FBHCTWS8",
  externalLink: "https://amazon.com/dp/B0FBHCTWS8",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
