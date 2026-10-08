import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldNightWatch = {
  id: "019db533-f388-7e54-9921-489f4c02ea14",
  type: "page-type/book",
  slug: "discworld-night-watch",
  title: "Discworld: Night Watch",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 29,
  ownLength: 107750,
  publishedAt: "2009-10-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000W912Q0",
      externalLink: "https://www.amazon.com/gp/product/B000W912Q0",
    },
  ],
  createdAt: "2026-04-22T12:39:34.024Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
