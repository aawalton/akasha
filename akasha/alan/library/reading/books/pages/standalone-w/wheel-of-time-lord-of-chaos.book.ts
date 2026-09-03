import type { Book } from "../../book.page-type.ts"

export const wheelOfTimeLordOfChaos = {
  id: "019db533-f39a-7f41-a7bc-5a6907885716",
  pageTypeSlug: "book",
  slug: "wheel-of-time-lord-of-chaos",
  title: "Wheel of Time: Lord of Chaos",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Robert Jordan",
  unitSlug: "words",
  position: 6,
  ownLength: 262250,
  ownProgress: 262250,
  publishedAt: "2010-03-11",
  source: "kindle",
  externalId: "B003BQZ80M",
  externalLink: "https://amazon.com/dp/B003BQZ80M",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
