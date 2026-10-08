import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const awakenOnlineCatharsis = {
  id: "019db533-f390-7894-b5c3-baeacc23d22f",
  type: "page-type/book",
  slug: "awaken-online-catharsis",
  title: "Awaken Online: Catharsis",
  status: "completed",
  author: "Travis Bagwell",
  unit: "unit/words",
  position: 1,
  ownLength: 131750,
  ownProgress: 131750,
  publishedAt: "2016-07-23",
  partOfCollections: ["book-series/awaken-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01J0E8Z8A",
      externalLink: "https://amazon.com/dp/B01J0E8Z8A",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
