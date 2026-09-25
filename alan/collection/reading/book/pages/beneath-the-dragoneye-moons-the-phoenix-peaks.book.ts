import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beneathTheDragoneyeMoonsThePhoenixPeaks = {
  id: "019db533-f390-7955-aa38-348074114788",
  type: "page-type/book",
  slug: "beneath-the-dragoneye-moons-the-phoenix-peaks",
  title: "Beneath the Dragoneye Moons: The Phoenix Peaks",
  status: "completed",
  author: "Selkie Myth",
  unit: "unit/words",
  position: 12,
  ownLength: 141500,
  ownProgress: 141500,
  publishedAt: "2025-01-16",
  partOfCollections: ["book-series/beneath-the-dragoneye-moons"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DT7SNDFZ",
      externalLink: "https://amazon.com/dp/B0DT7SNDFZ",
    },
  ],
} as const satisfies Book
