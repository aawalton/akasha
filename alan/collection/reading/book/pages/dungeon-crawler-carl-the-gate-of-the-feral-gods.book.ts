import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dungeonCrawlerCarlTheGateOfTheFeralGods = {
  id: "019db533-f390-7ed1-8b94-2bea6dc051b2",
  type: "page-type/book",
  slug: "dungeon-crawler-carl-the-gate-of-the-feral-gods",
  title: "Dungeon Crawler Carl: The Gate of the Feral Gods",
  status: "not-started",
  author: "Matt Dinniman",
  unit: "unit/words",
  position: 4,
  ownLength: 146500,
  publishedAt: "2021-07-01",
  partOfCollections: ["book-series/dungeon-crawler-carl"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B093DJ7F3C",
      externalLink: "https://amazon.com/dp/B093DJ7F3C",
    },
  ],
} as const satisfies Book
