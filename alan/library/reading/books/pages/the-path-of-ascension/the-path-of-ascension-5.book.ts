import type { Book } from "../../book.page-type.ts"

export const thePathOfAscension5 = {
  id: "019db533-f391-73a0-95db-ee2363e58fff",
  pageTypeSlug: "book",
  slug: "the-path-of-ascension-5",
  title: "The Path of Ascension 5",
  kind: "read",
  status: "completed",
  author: "C. Mantis",
  unitSlug: "words",
  position: 5,
  ownLength: 159500,
  ownProgress: 159500,
  publishedAt: "2023-12-13",
  partOfSlugs: ["book-series/the-path-of-ascension"],
  source: "kindle",
  externalId: "B0CHFXQ3QH",
  externalLink: "https://amazon.com/dp/B0CHFXQ3QH",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
