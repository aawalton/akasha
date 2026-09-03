import type { Book } from "../../book.page-type.ts"

export const wheelOfTimeACrownOfSwords = {
  id: "019db533-f39b-73ec-b406-d05c1d5c2063",
  pageTypeSlug: "book",
  slug: "wheel-of-time-a-crown-of-swords",
  title: "Wheel of Time: A Crown of Swords",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Robert Jordan",
  unitSlug: "words",
  position: 7,
  ownLength: 225500,
  ownProgress: 225500,
  publishedAt: "2010-04-14",
  source: "kindle",
  externalId: "B003H4I5G2",
  externalLink: "https://amazon.com/dp/B003H4I5G2",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
