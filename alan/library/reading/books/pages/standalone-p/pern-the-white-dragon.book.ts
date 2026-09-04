import type { Book } from "../../book.page-type.ts"

export const pernTheWhiteDragon = {
  id: "019db533-f39a-784e-bff4-916dc351b019",
  pageTypeSlug: "book",
  slug: "pern-the-white-dragon",
  title: "Pern: The White Dragon",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
  position: 20,
  ownLength: 117000,
  publishedAt: "2002-02-26",
  source: "kindle",
  externalId: "B000FBFOD2",
  externalLink: "https://www.amazon.com/dp/B000FBFOD2",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
