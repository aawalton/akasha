import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const awakenOnlineHappy = {
  id: "019db533-f390-785b-9f21-e886031fd622",
  type: "page-type/book",
  slug: "awaken-online-happy",
  title: "Awaken Online: Happy",
  status: "completed",
  unit: "unit/words",
  position: 9,
  ownLength: 187250,
  ownProgress: 187250,
  publishedAt: "2021-12-07",
  partOfCollections: ["book-series/awaken-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09KYD8JMT",
      externalLink: "https://amazon.com/dp/B09KYD8JMT",
    },
  ],
} as const satisfies Book
