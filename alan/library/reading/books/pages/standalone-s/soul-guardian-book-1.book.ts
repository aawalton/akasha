import type { Book } from "../../book.page-type.ts"

export const soulGuardianBook1 = {
  id: "019db533-f391-7659-9c6c-44efd59cf357",
  pageTypeSlug: "book",
  slug: "soul-guardian-book-1",
  title: "Soul Guardian",
  kind: "read",
  status: "completed",
  author: "Alex Karne",
  unitSlug: "words",
  position: 1,
  ownLength: 89250,
  ownProgress: 89250,
  publishedAt: "2025-01-27",
  source: "kindle",
  externalId: "B0DTGFR768",
  externalLink: "https://amazon.com/dp/B0DTGFR768",
} as const satisfies Book
