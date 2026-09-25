import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const alexaThymeBreakingThrough = {
  id: "019db533-f390-76c4-bd39-b7aed5585867",
  type: "page-type/book",
  slug: "alexa-thyme-breaking-through",
  title: "Alexa Thyme: Breaking Through",
  status: "completed",
  author: "Lykanthropy",
  unit: "unit/words",
  position: 1,
  ownLength: 101250,
  ownProgress: 101250,
  publishedAt: "2023-12-20",
  partOfCollections: ["book-series/alexa-thyme"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CQ4W3KH1",
      externalLink: "https://amazon.com/dp/B0CQ4W3KH1",
    },
  ],
} as const satisfies Book
