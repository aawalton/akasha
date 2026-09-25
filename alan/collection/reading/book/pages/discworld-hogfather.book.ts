import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldHogfather = {
  id: "019db533-f39b-70ed-9b28-45c4d66aacdf",
  type: "page-type/book",
  slug: "discworld-hogfather",
  title: "Discworld: Hogfather",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 20,
  ownLength: 88750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W5MIGC",
      externalLink: "https://www.amazon.com/dp/B000W5MIGC",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
