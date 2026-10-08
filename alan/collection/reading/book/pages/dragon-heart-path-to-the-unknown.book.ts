import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartPathToTheUnknown = {
  id: "019db533-f390-7e52-b6cb-06dc0eb5a2b0",
  type: "page-type/book",
  slug: "dragon-heart-path-to-the-unknown",
  title: "Dragon Heart: Path to the Unknown",
  status: "completed",
  unit: "unit/words",
  position: 11,
  ownLength: 101750,
  ownProgress: 101750,
  publishedAt: "2021-06-17",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0915D4VSV",
      externalLink: "https://amazon.com/dp/B0915D4VSV",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
