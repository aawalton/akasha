import type { Book } from "../book.page-type.types.ts"

export const discworldWyrdSisters = {
  id: "019db533-f39a-77e9-adb2-ca6ad968d049",
  pageTypeSlug: "book",
  type: "book",
  slug: "discworld-wyrd-sisters",
  title: "Discworld: Wyrd Sisters",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "words",
  position: 6,
  ownLength: 83500,
  source: "kindle",
  externalId: "B000W94DZC",
  externalLink: "https://www.amazon.com/dp/B000W94DZC",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
