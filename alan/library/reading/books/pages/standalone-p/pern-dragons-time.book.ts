import type { Book } from "../../book.page-type.ts"

export const pernDragonsTime = {
  id: "019db533-f39b-732e-b633-44b43803622f",
  pageTypeSlug: "book",
  slug: "pern-dragons-time",
  title: "Pern: Dragon's Time",
  kind: "read",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 10,
  ownLength: 124500,
  source: "kindle",
  externalId: "B004J4WKB0",
  externalLink: "https://www.amazon.com/dp/B004J4WKB0",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
