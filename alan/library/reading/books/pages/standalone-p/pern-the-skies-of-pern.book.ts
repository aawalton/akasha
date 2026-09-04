import type { Book } from "../../book.page-type.ts"

export const pernTheSkiesOfPern = {
  id: "019db533-f39a-7a27-96d7-44effca30f4e",
  pageTypeSlug: "book",
  slug: "pern-the-skies-of-pern",
  title: "Pern: The Skies of Pern",
  kind: "read",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 24,
  ownLength: 120000,
  source: "kindle",
  externalId: "B000FC1KGQ",
  externalLink: "https://www.amazon.com/dp/B000FC1KGQ",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
