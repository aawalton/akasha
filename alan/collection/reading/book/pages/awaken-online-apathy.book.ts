import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const awakenOnlineApathy = {
  id: "019db533-f390-787c-916f-9a3c28c1eaa9",
  type: "page-type/book",
  slug: "awaken-online-apathy",
  title: "Awaken Online: Apathy",
  status: "completed",
  author: "Travis Bagwell",
  unit: "unit/words",
  position: 5,
  ownLength: 85500,
  ownProgress: 85500,
  publishedAt: "2018-07-26",
  partOfCollections: ["book-series/awaken-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07FY3Z5Z3",
      externalLink: "https://amazon.com/dp/B07FY3Z5Z3",
    },
  ],
} as const satisfies Book
