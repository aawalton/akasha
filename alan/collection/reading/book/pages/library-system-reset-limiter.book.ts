import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const librarySystemResetLimiter = {
  id: "019db533-f391-7191-956f-8d0ad2c6f286",
  type: "page-type/book",
  slug: "library-system-reset-limiter",
  title: "Library System Reset: Limiter",
  status: "not-started",
  author: "Paul J. Deitel, Harvey M. Deitel",
  unit: "unit/words",
  position: 4,
  ownLength: 155250,
  publishedAt: "2025-04-18",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DNCJ4GTN",
      externalLink: "https://amazon.com/dp/B0DNCJ4GTN",
    },
  ],
} as const satisfies Book
