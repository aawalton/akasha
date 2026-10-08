import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const awakenOnlinePrecipice = {
  id: "019db533-f390-7884-a525-403ccd8912cc",
  type: "page-type/book",
  slug: "awaken-online-precipice",
  title: "Awaken Online: Precipice",
  status: "completed",
  author: "Travis Bagwell",
  unit: "unit/words",
  position: 2,
  ownLength: 149000,
  ownProgress: 149000,
  publishedAt: "2017-03-26",
  partOfCollections: ["book-series/awaken-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01N5NPTUS",
      externalLink: "https://amazon.com/dp/B01N5NPTUS",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
