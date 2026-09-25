import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWarOfBrokenMirrorsStealingSorcery = {
  id: "019db533-f39a-7b52-9768-563109954044",
  type: "page-type/book",
  slug: "the-war-of-broken-mirrors-stealing-sorcery",
  title: "The War of Broken Mirrors: Stealing Sorcery",
  status: "completed",
  author: "Andrew Rowe",
  unit: "unit/words",
  position: 1,
  ownLength: 155250,
  ownProgress: 155250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B016IPJ1R8",
      externalLink: "https://www.amazon.com/dp/B016IPJ1R8",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
