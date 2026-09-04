import type { Book } from "../../book.page-type.ts"

export const rama2 = {
  id: "019db533-f39a-7d69-b3d3-6848491f9279",
  pageTypeSlug: "book",
  slug: "rama-2",
  title: "Rama 2",
  status: "not-started",
  author: "Arthur C. Clarke, Lee Clarke",
  unitSlug: "words",
  position: 1,
  ownLength: 127500,
  source: "kindle",
  externalId: "B07X8ZQKJQ",
  externalLink: "https://www.amazon.com/dp/B07X8ZQKJQ",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
