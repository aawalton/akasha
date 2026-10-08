import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chaosSeedsAlliances = {
  id: "019db533-f390-7aa4-bb30-ff5445dce0ee",
  type: "page-type/book",
  slug: "chaos-seeds-alliances",
  title: "Chaos Seeds: Alliances",
  status: "completed",
  grade: "C",
  unit: "unit/words",
  position: 3,
  ownLength: 160250,
  ownProgress: 160250,
  publishedAt: "2016-03-22",
  partOfCollections: ["book-series/chaos-seeds"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01DCAV4W2",
      externalLink: "https://amazon.com/dp/B01DCAV4W2",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
