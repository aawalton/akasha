import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldTheLightFantastic = {
  id: "019db533-f39a-78f7-bae1-f15581d95c39",
  type: "page-type/book",
  slug: "discworld-the-light-fantastic",
  title: "Discworld: The Light Fantastic",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 2,
  ownLength: 68000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W914OU",
      externalLink: "https://www.amazon.com/dp/B000W914OU",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
