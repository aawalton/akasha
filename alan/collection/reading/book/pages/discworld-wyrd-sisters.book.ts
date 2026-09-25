import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldWyrdSisters = {
  id: "019db533-f39a-77e9-adb2-ca6ad968d049",
  type: "page-type/book",
  slug: "discworld-wyrd-sisters",
  title: "Discworld: Wyrd Sisters",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 6,
  ownLength: 83500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W94DZC",
      externalLink: "https://www.amazon.com/dp/B000W94DZC",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
