import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePrimalHunter12 = {
  id: "019db533-f391-7a30-9f1d-2b950679f70c",
  type: "page-type/book",
  slug: "the-primal-hunter-12",
  title: "The Primal Hunter 12",
  status: "completed",
  author: "Zogarth",
  unit: "unit/words",
  position: 12,
  ownLength: 150500,
  ownProgress: 150500,
  publishedAt: "2025-03-26",
  partOfCollections: ["book-series/the-primal-hunter"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DNFXBTWV",
      externalLink: "https://amazon.com/dp/B0DNFXBTWV",
    },
  ],
} as const satisfies Book
