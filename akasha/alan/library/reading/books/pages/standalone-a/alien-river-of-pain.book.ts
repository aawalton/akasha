import type { Book } from "../../book.page-type.ts"

export const alienRiverOfPain = {
  id: "019db533-f39b-72af-bb59-f85a40d2a50d",
  pageTypeSlug: "book",
  slug: "alien-river-of-pain",
  title: "Alien: River of Pain",
  kind: "read",
  status: "not-started",
  author: "Christopher Golden",
  unitSlug: "words",
  position: 2,
  ownLength: 84250,
  source: "kindle",
  externalId: "B00KPBBTS6",
  externalLink: "https://www.amazon.com/dp/B00KPBBTS6",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
