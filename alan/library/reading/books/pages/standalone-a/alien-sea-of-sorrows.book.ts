import type { Book } from "../../book.page-type.ts"

export const alienSeaOfSorrows = {
  id: "019db533-f39b-727b-a76e-fcf50958c8eb",
  pageTypeSlug: "book",
  slug: "alien-sea-of-sorrows",
  title: "Alien: Sea of Sorrows",
  kind: "read",
  status: "not-started",
  author: "James A. Moore",
  unitSlug: "words",
  position: 1,
  ownLength: 85750,
  source: "kindle",
  externalId: "B00I1ZNCF6",
  externalLink: "https://www.amazon.com/dp/B00I1ZNCF6",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
