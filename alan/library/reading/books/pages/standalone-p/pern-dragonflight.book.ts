import type { Book } from "../../book.page-type.ts"

export const pernDragonflight = {
  id: "019db533-f39b-7317-9dd5-2a10584432cc",
  pageTypeSlug: "book",
  slug: "pern-dragonflight",
  title: "Pern: Dragonflight",
  kind: "read",
  status: "paused",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 15,
  ownLength: 80000,
  ownProgress: 1500,
  source: "kindle",
  externalId: "B000FBFOCI",
  externalLink: "https://www.amazon.com/dp/B000FBFOCI",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
