import type { Book } from "../../book.page-type.ts"

export const pernTheDolphinsOfPern = {
  id: "019db533-f39a-7af1-9169-da9884e9f83e",
  pageTypeSlug: "book",
  slug: "pern-the-dolphins-of-pern",
  title: "Pern: The Dolphins of Pern",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 23,
  ownLength: 96000,
  source: "kindle",
  externalId: "B000FBFOQ4",
  externalLink: "https://www.amazon.com/dp/B000FBFOQ4",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
