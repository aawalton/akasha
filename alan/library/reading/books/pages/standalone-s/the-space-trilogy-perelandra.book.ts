import type { Book } from "../../book.page-type.ts"

export const theSpaceTrilogyPerelandra = {
  id: "019db533-f39a-7c12-9e5e-02931938d7eb",
  pageTypeSlug: "book",
  slug: "the-space-trilogy-perelandra",
  title: "The Space Trilogy: Perelandra",
  status: "not-started",
  author: "C. S. Lewis",
  unitSlug: "words",
  position: 1,
  ownLength: 44750,
  source: "kindle",
  externalId: "B006L872Q0",
  externalLink: "https://www.amazon.com/dp/B006L872Q0",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
