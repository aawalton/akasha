import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cultureMatter = {
  id: "019db533-f39a-7f14-b646-d816225f48d8",
  type: "page-type/book",
  slug: "culture-matter",
  title: "Culture: Matter",
  status: "not-started",
  author: "Lawrence E. Harrison, Samuel P. Huntington",
  unit: "unit/words",
  position: 6,
  ownLength: 155000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000VMHI98",
      externalLink: "https://www.amazon.com/dp/B000VMHI98",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
