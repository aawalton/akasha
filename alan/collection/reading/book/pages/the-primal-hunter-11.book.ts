import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePrimalHunter11 = {
  id: "019db533-f391-7a37-95b0-b31cc366e237",
  type: "page-type/book",
  slug: "the-primal-hunter-11",
  title: "The Primal Hunter 11",
  status: "completed",
  author: "Zogarth",
  unit: "unit/words",
  position: 11,
  ownLength: 180500,
  ownProgress: 180500,
  publishedAt: "2024-11-26",
  partOfCollections: ["book-series/the-primal-hunter"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DBRPF2JB",
      externalLink: "https://amazon.com/dp/B0DBRPF2JB",
    },
  ],
} as const satisfies Book
