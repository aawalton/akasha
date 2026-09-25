import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartPathToTheGlory = {
  id: "019db533-f390-7e5d-a493-6ddaec66dbfe",
  type: "page-type/book",
  slug: "dragon-heart-path-to-the-glory",
  title: "Dragon Heart: Path to the Glory",
  status: "completed",
  unit: "unit/words",
  position: 12,
  ownLength: 95250,
  ownProgress: 95250,
  publishedAt: "2021-08-25",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B096T17XP3",
      externalLink: "https://amazon.com/dp/B096T17XP3",
    },
  ],
} as const satisfies Book
