import type { Book } from "../../book.page-type.ts"

export const hyperionCantosEndymion = {
  id: "019db533-f39b-70ae-809a-51545820e32a",
  pageTypeSlug: "book",
  slug: "hyperion-cantos-endymion",
  title: "Hyperion Cantos: Endymion",
  kind: "read",
  status: "not-started",
  author: "Dan Simmons",
  unitSlug: "words",
  position: 2,
  ownLength: 144500,
  source: "kindle",
  externalId: "B004G606I0",
  externalLink: "https://www.amazon.com/dp/B004G606I0",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
