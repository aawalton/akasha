import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dresdenFilesPeaceTalks = {
  id: "019db533-f39a-7c03-9ca9-678443f151c1",
  type: "page-type/book",
  slug: "dresden-files-peace-talks",
  title: "Dresden Files: Peace Talks",
  status: "not-started",
  author: "Jim Butcher",
  unit: "unit/words",
  position: 15,
  ownLength: 87000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B082S1N87S",
      externalLink: "https://www.amazon.com/dp/B082S1N87S",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
