import type { Book } from "../../book.page-type.ts"

export const marsTrilogyBlueMars = {
  id: "019db533-f39b-72d4-94e6-40e3ae9938f9",
  pageTypeSlug: "book",
  slug: "mars-trilogy-blue-mars",
  title: "Mars Trilogy: Blue Mars",
  kind: "read",
  status: "not-started",
  author: "Kim Stanley Robinson",
  unitSlug: "words",
  position: 2,
  ownLength: 187000,
  source: "kindle",
  externalId: "B00165EXI8",
  externalLink: "https://www.amazon.com/dp/B00165EXI8",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
