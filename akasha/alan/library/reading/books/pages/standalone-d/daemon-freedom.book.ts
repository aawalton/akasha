import type { Book } from "../../book.page-type.ts"

export const daemonFreedom = {
  id: "019db533-f39b-7087-bf01-6b0092b0d531",
  pageTypeSlug: "book",
  slug: "daemon-freedom",
  title: "Daemon: Freedom",
  kind: "read",
  status: "not-started",
  author: "François-René de Chateaubriand",
  unitSlug: "words",
  position: 1,
  ownLength: 104250,
  source: "kindle",
  externalId: "B002VUFKDY",
  externalLink: "https://www.amazon.com/dp/B002VUFKDY",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
