import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dungeonCrawlerCarlCarlsDoomsdayScenario = {
  id: "019db533-f390-7ef3-9beb-48307a644839",
  type: "page-type/book",
  slug: "dungeon-crawler-carl-carls-doomsday-scenario",
  title: "Dungeon Crawler Carl: Carl's Doomsday Scenario",
  status: "not-started",
  author: "Matt Dinniman",
  unit: "unit/words",
  position: 2,
  ownLength: 91000,
  publishedAt: "2021-01-06",
  partOfCollections: ["book-series/dungeon-crawler-carl"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08PBCD9Y7",
      externalLink: "https://amazon.com/dp/B08PBCD9Y7",
    },
  ],
} as const satisfies Book
