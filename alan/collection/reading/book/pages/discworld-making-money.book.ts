import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldMakingMoney = {
  id: "019db533-f388-7d67-a16f-ae9e9aa87c93",
  type: "page-type/book",
  slug: "discworld-making-money",
  title: "Discworld: Making Money",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 36,
  ownLength: 107000,
  publishedAt: "2009-10-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000SEHLE6",
      externalLink: "https://www.amazon.com/gp/product/B000SEHLE6",
    },
  ],
} as const satisfies Book
