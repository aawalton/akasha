import type { Book } from "../../book.page-type.ts"

export const thePrimalHunterBook1 = {
  id: "019db533-f391-7b25-8910-ba992e0a4e9c",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-book-1",
  title: "The Primal Hunter",
  kind: "read",
  status: "completed",
  author: "Zogarth",
  unitSlug: "words",
  position: 1,
  ownLength: 178500,
  ownProgress: 178500,
  publishedAt: "2022-03-08",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B09MV3G8PG",
  externalLink: "https://amazon.com/dp/B09MV3G8PG",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
