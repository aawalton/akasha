import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cinnamonBun2 = {
  id: "019db533-f390-7bb4-b6bd-72f7230984b7",
  type: "page-type/book",
  slug: "cinnamon-bun-2",
  title: "Cinnamon Bun 2",
  status: "not-started",
  author: "michael linnett",
  unit: "unit/words",
  position: 2,
  ownLength: 105500,
  publishedAt: "2020-10-07",
  partOfCollections: ["book-series/cinnamon-bun"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08KWB81WS",
      externalLink: "https://amazon.com/dp/B08KWB81WS",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
