import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldWitchesAbroad = {
  id: "019db533-f39a-7822-af09-e51294304f06",
  type: "page-type/book",
  slug: "discworld-witches-abroad",
  title: "Discworld: Witches Abroad",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 12,
  ownLength: 84000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B001AW2OYC",
      externalLink: "https://www.amazon.com/dp/B001AW2OYC",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
