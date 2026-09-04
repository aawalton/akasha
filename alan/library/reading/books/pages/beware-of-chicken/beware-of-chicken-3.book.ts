import type { Book } from "../../book.page-type.ts"

export const bewareOfChicken3 = {
  id: "019db533-f390-7a04-9604-7f85766cc4aa",
  pageTypeSlug: "book",
  slug: "beware-of-chicken-3",
  title: "Beware of Chicken 3",
  kind: "read",
  status: "completed",
  author: "Casualfarmer",
  unitSlug: "words",
  position: 3,
  ownLength: 149250,
  ownProgress: 149250,
  publishedAt: "2023-11-21",
  partOfSlugs: ["book-series/beware-of-chicken"],
  source: "kindle",
  externalId: "B0C825LF1K",
  externalLink: "https://amazon.com/dp/B0C825LF1K",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
