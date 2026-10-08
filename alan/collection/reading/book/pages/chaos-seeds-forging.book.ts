import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chaosSeedsForging = {
  id: "019db533-f390-7a9c-9fe2-5810a3646599",
  type: "page-type/book",
  slug: "chaos-seeds-forging",
  title: "Chaos Seeds: Forging",
  status: "completed",
  grade: "B",
  author: "Aleron Kong",
  unit: "unit/words",
  position: 2,
  ownLength: 129000,
  ownProgress: 129000,
  publishedAt: "2016-01-18",
  partOfCollections: ["book-series/chaos-seeds"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01ATAN9G2",
      externalLink: "https://amazon.com/dp/B01ATAN9G2",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
