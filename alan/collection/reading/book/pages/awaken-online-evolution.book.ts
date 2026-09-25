import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const awakenOnlineEvolution = {
  id: "019db533-f390-788c-b4c4-458626012440",
  type: "page-type/book",
  slug: "awaken-online-evolution",
  title: "Awaken Online: Evolution",
  status: "completed",
  author: "Travis Bagwell",
  unit: "unit/words",
  position: 4,
  ownLength: 192250,
  ownProgress: 192250,
  publishedAt: "2018-05-23",
  partOfCollections: ["book-series/awaken-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07D97M5MW",
      externalLink: "https://amazon.com/dp/B07D97M5MW",
    },
  ],
} as const satisfies Book
