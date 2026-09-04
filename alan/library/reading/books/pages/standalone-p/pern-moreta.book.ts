import type { Book } from "../../book.page-type.ts"

export const pernMoreta = {
  id: "019db533-f39a-7ed8-b9f7-6f8e72c386e1",
  pageTypeSlug: "book",
  slug: "pern-moreta",
  title: "Pern: Moreta",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 12,
  ownLength: 96000,
  source: "kindle",
  externalId: "B000FBFODW",
  externalLink: "https://www.amazon.com/dp/B000FBFODW",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
