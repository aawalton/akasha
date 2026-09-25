import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dresdenFilesTurnCoat = {
  id: "019db533-f39a-791e-aa14-149f27003d62",
  type: "page-type/book",
  slug: "dresden-files-turn-coat",
  title: "Dresden Files: Turn Coat",
  status: "not-started",
  author: "Jim Butcher",
  unit: "unit/words",
  position: 10,
  ownLength: 136250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B001V6P124",
      externalLink: "https://www.amazon.com/dp/B001V6P124",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
