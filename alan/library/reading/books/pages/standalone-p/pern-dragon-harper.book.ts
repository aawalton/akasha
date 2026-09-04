import type { Book } from "../../book.page-type.ts"

export const pernDragonHarper = {
  id: "019db533-f39b-72e3-a75b-85b9d2d31ca8",
  pageTypeSlug: "book",
  slug: "pern-dragon-harper",
  title: "Pern: Dragon Harper",
  kind: "read",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 6,
  ownLength: 96500,
  source: "kindle",
  externalId: "B000W93AEM",
  externalLink: "https://www.amazon.com/dp/B000W93AEM",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
