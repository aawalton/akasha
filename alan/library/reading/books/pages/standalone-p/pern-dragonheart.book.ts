import type { Book } from "../../book.page-type.ts"

export const pernDragonheart = {
  id: "019db533-f39b-71d0-9aac-2c8609b025af",
  pageTypeSlug: "book",
  slug: "pern-dragonheart",
  title: "Pern: Dragonheart",
  kind: "read",
  status: "not-started",
  author: "Todd McCaffrey",
  unitSlug: "words",
  position: 8,
  ownLength: 136500,
  source: "kindle",
  externalId: "B0015DWLW6",
  externalLink: "https://www.amazon.com/dp/B0015DWLW6",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
