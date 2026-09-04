import type { Book } from "../../book.page-type.ts"

export const sagewoodAWayHome = {
  id: "019db533-f391-7551-9480-21fc96c0dd12",
  pageTypeSlug: "book",
  slug: "sagewood-a-way-home",
  title: "Sagewood: A Way Home",
  status: "not-started",
  unitSlug: "words",
  position: 3,
  ownLength: 96000,
  publishedAt: "2024-12-04",
  partOfSlugs: ["book-series/sagewood"],
  source: "kindle",
  externalId: "B0DDQHN65Y",
  externalLink: "https://amazon.com/dp/B0DDQHN65Y",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
