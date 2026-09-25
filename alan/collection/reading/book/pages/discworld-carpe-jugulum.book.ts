import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldCarpeJugulum = {
  id: "019db533-f388-7de2-b941-4de56b2edab1",
  type: "page-type/book",
  slug: "discworld-carpe-jugulum",
  title: "Discworld: Carpe Jugulum",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 22,
  ownLength: 96000,
  publishedAt: "2009-10-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W5MI9Y",
      externalLink: "https://www.amazon.com/gp/product/B000W5MI9Y",
    },
  ],
} as const satisfies Book
