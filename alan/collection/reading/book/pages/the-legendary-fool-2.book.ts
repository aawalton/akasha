import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLegendaryFool2 = {
  id: "019db533-f391-7a11-82dd-cc2c7a7d89e0",
  type: "page-type/book",
  slug: "the-legendary-fool-2",
  title: "The Legendary Fool 2",
  status: "not-started",
  author: "Ali Jamnia",
  unit: "unit/words",
  position: 2,
  ownLength: 110500,
  publishedAt: "2025-07-02",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F1YRCNRD",
      externalLink: "https://amazon.com/dp/B0F1YRCNRD",
    },
  ],
} as const satisfies Book
