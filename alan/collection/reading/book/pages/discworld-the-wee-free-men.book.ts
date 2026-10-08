import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldTheWeeFreeMen = {
  id: "019db533-f388-7e78-8af9-3ac0cc476ab0",
  type: "page-type/book",
  slug: "discworld-the-wee-free-men",
  title: "Discworld: The Wee Free Men",
  status: "not-started",
  author: "Terry Pratchett, Paul Kidby",
  unit: "unit/words",
  position: 30,
  ownLength: 99750,
  publishedAt: "2009-10-06",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000R33QWY",
      externalLink: "https://www.amazon.com/gp/product/B000R33QWY",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
