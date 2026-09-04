import type { Book } from "../../book.page-type.ts"

export const pernDragonquest = {
  id: "019db533-f39b-72be-90b4-ee03a3de06f5",
  pageTypeSlug: "book",
  slug: "pern-dragonquest",
  title: "Pern: Dragonquest",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 16,
  ownLength: 88000,
  source: "kindle",
  externalId: "B000FBFOCS",
  externalLink: "https://www.amazon.com/dp/B000FBFOCS",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
