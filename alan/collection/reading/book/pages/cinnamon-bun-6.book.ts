import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cinnamonBun6 = {
  id: "019db533-f390-7b9b-a88a-e2ec13a279e4",
  type: "page-type/book",
  slug: "cinnamon-bun-6",
  title: "Cinnamon Bun 6",
  status: "not-started",
  author: "Sara B.",
  unit: "unit/words",
  position: 6,
  ownLength: 80250,
  publishedAt: "2025-06-24",
  partOfCollections: ["book-series/cinnamon-bun"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F63VD29W",
      externalLink: "https://amazon.com/dp/B0F63VD29W",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
