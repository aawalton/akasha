import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const somniaOnlineFusion = {
  id: "019db533-f391-7636-a343-f2395ea89f86",
  type: "page-type/book",
  slug: "somnia-online-fusion",
  title: "Somnia Online: Fusion",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 106500,
  ownProgress: 106500,
  publishedAt: "2020-04-14",
  partOfCollections: ["book-series/somnia-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B086TW144S",
      externalLink: "https://amazon.com/dp/B086TW144S",
    },
  ],
} as const satisfies Book
