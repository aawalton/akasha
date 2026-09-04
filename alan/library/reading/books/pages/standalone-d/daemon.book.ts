import type { Book } from "../../book.page-type.ts"

export const daemon = {
  id: "019db533-f39b-7309-971e-bf4518eec2e0",
  pageTypeSlug: "book",
  slug: "daemon",
  title: "Daemon",
  status: "not-started",
  author: "Daniel Suarez",
  unitSlug: "words",
  ownLength: 122250,
  source: "kindle",
  externalId: "B003QP4NPE",
  externalLink: "https://www.amazon.com/dp/B003QP4NPE",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
