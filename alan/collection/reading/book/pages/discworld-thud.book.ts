import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldThud = {
  id: "019db533-f388-7e9c-b552-36f45b25e6a4",
  type: "page-type/book",
  slug: "discworld-thud",
  title: "Discworld: Thud!",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 34,
  ownLength: 104000,
  publishedAt: "2009-10-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FCKCXS",
      externalLink: "https://www.amazon.com/gp/product/B000FCKCXS",
    },
  ],
} as const satisfies Book
