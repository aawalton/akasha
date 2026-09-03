import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter8 = {
  id: "019db533-f391-7a52-b3a5-973d16af78e4",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-8",
  title: "The Primal Hunter 8",
  kind: "read",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unitSlug: "words",
  position: 8,
  ownLength: 151000,
  ownProgress: 151000,
  publishedAt: "2024-01-17",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B0CHSJVWL7",
  externalLink: "https://amazon.com/dp/B0CHSJVWL7",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
