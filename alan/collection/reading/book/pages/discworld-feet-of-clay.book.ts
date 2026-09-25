import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldFeetOfClay = {
  id: "019db533-f39b-708e-a859-ec9ef22812b2",
  type: "page-type/book",
  slug: "discworld-feet-of-clay",
  title: "Discworld: Feet of Clay",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 19,
  ownLength: 92750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000TU16OU",
      externalLink: "https://www.amazon.com/dp/B000TU16OU",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
