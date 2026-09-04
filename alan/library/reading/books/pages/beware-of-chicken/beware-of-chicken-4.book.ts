import type { Book } from "../../book.page-type.ts"

export const bewareOfChicken4 = {
  id: "019db533-f390-79e9-979c-17b0935ce3fe",
  pageTypeSlug: "book",
  slug: "beware-of-chicken-4",
  title: "Beware of Chicken 4",
  status: "completed",
  author: "Casualfarmer",
  unitSlug: "words",
  position: 4,
  ownLength: 181000,
  ownProgress: 181000,
  publishedAt: "2024-11-19",
  partOfSlugs: ["book-series/beware-of-chicken"],
  source: "kindle",
  externalId: "B0CYZSLDJL",
  externalLink: "https://amazon.com/dp/B0CYZSLDJL",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
