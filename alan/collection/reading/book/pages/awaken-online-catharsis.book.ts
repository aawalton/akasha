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
} as const satisfies Book
