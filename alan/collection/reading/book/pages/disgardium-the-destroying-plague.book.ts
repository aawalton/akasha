import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const disgardiumTheDestroyingPlague = {
  id: "019db533-f390-7dc6-8551-aaeb6cd810cc",
  type: "page-type/book",
  slug: "disgardium-the-destroying-plague",
  title: "Disgardium: The Destroying Plague",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 128750,
  ownProgress: 128750,
  publishedAt: "2020-01-09",
  partOfCollections: ["book-series/disgardium"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07ZPB3BV6",
      externalLink: "https://amazon.com/dp/B07ZPB3BV6",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
