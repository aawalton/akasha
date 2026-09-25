import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dungeonCrawlerCarlTheDungeonAnarchistsCookbook = {
  id: "019db533-f390-7ec6-b1dc-b077006f9cd7",
  type: "page-type/book",
  slug: "dungeon-crawler-carl-the-dungeon-anarchists-cookbook",
  title: "Dungeon Crawler Carl: The Dungeon Anarchist's Cookbook",
  status: "not-started",
  author: "Matt Dinniman",
  unit: "unit/words",
  position: 3,
  ownLength: 133500,
  publishedAt: "2021-04-02",
  partOfCollections: ["book-series/dungeon-crawler-carl"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08V4QSV6W",
      externalLink: "https://amazon.com/dp/B08V4QSV6W",
    },
  ],
} as const satisfies Book
