import type { Book } from "../../book.page-type.ts"

export const librarySystemResetLimiter = {
  id: "019db533-f391-7191-956f-8d0ad2c6f286",
  pageTypeSlug: "book",
  slug: "library-system-reset-limiter",
  title: "Library System Reset: Limiter",
  kind: "read",
  status: "not-started",
  author: "Paul J. Deitel, Harvey M. Deitel",
  unitSlug: "words",
  position: 4,
  ownLength: 155250,
  publishedAt: "2025-04-18",
  source: "kindle",
  externalId: "B0DNCJ4GTN",
  externalLink: "https://amazon.com/dp/B0DNCJ4GTN",
} as const satisfies Book
