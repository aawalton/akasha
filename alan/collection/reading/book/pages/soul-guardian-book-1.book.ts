import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const soulGuardianBook1 = {
  id: "019db533-f391-7659-9c6c-44efd59cf357",
  type: "page-type/book",
  slug: "soul-guardian-book-1",
  title: "Soul Guardian",
  status: "completed",
  author: "Alex Karne",
  unit: "unit/words",
  position: 1,
  ownLength: 89250,
  ownProgress: 89250,
  publishedAt: "2025-01-27",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DTGFR768",
      externalLink: "https://amazon.com/dp/B0DTGFR768",
    },
  ],
} as const satisfies Book
