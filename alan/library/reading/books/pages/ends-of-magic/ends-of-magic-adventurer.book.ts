import type { Book } from "../../book.page-type.ts"

export const endsOfMagicAdventurer = {
  id: "019db533-f390-7f72-b897-3f5c431a356a",
  pageTypeSlug: "book",
  slug: "ends-of-magic-adventurer",
  title: "Ends of Magic: Adventurer",
  status: "completed",
  author: "Mark Twain",
  unitSlug: "words",
  position: 2,
  ownLength: 111500,
  ownProgress: 111500,
  publishedAt: "2024-01-30",
  partOfSlugs: ["book-series/ends-of-magic"],
  source: "kindle",
  externalId: "B0CKF8FS4Q",
  externalLink: "https://amazon.com/dp/B0CKF8FS4Q",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
