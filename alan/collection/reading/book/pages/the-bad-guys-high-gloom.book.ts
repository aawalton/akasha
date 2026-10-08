import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBadGuysHighGloom = {
  id: "019db533-f391-77bd-8a3d-37271e229d6a",
  type: "page-type/book",
  slug: "the-bad-guys-high-gloom",
  title: "The Bad Guys: High Gloom",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 121000,
  ownProgress: 121000,
  publishedAt: "2020-12-22",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08LDWBZHC",
      externalLink: "https://amazon.com/dp/B08LDWBZHC",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
