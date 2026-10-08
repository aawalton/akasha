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
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
