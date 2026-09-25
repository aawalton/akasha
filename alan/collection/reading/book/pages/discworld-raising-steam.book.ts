import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldRaisingSteam = {
  id: "019db533-f388-7e2e-ac65-ed3454bad032",
  type: "page-type/book",
  slug: "discworld-raising-steam",
  title: "Discworld: Raising Steam",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 40,
  ownLength: 96500,
  publishedAt: "2014-03-18",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00FIN0TGY",
      externalLink: "https://www.amazon.com/gp/product/B00FIN0TGY",
    },
  ],
} as const satisfies Book
