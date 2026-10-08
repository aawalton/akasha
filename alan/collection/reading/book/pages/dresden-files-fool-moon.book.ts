import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dresdenFilesFoolMoon = {
  id: "019db533-f39b-70f9-8592-a5f8828151df",
  type: "page-type/book",
  slug: "dresden-files-fool-moon",
  title: "Dresden Files: Fool Moon",
  status: "not-started",
  author: "Jim Butcher, Mark Powers, Chase Conley, Tyler Walpole, James Marsters",
  unit: "unit/words",
  position: 1,
  ownLength: 108000,
  publishedAt: "2001-01-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B001BPYD2O",
      externalLink: "https://www.amazon.com/dp/B001BPYD2O",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
