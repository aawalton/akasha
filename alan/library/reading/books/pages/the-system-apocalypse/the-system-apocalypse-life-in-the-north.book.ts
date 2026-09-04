import type { Book } from "../../book.page-type.ts"

export const theSystemApocalypseLifeInTheNorth = {
  id: "019db533-f391-7be7-9a12-48bbc208c292",
  pageTypeSlug: "book",
  slug: "the-system-apocalypse-life-in-the-north",
  title: "The System Apocalypse: Life in the North",
  kind: "read",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 1,
  ownLength: 93000,
  ownProgress: 93000,
  publishedAt: "2017-07-02",
  partOfSlugs: ["book-series/the-system-apocalypse"],
  source: "kindle",
  externalId: "B073PNL3BP",
  externalLink: "https://amazon.com/dp/B073PNL3BP",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
