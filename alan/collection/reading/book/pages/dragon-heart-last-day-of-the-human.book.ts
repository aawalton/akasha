import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartLastDayOfTheHuman = {
  id: "019db533-f390-7db7-b602-a65668c3b964",
  type: "page-type/book",
  slug: "dragon-heart-last-day-of-the-human",
  title: "Dragon Heart: Last Day Of The Human",
  status: "not-started",
  author: "Winsor McCay",
  unit: "unit/words",
  position: 20,
  ownLength: 128250,
  publishedAt: "2023-11-16",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CBD1FBG1",
      externalLink: "https://amazon.com/dp/B0CBD1FBG1",
    },
  ],
} as const satisfies Book
