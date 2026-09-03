import type { Book } from "../../book.page-type.ts"

export const dungeonCrawlerCarlTheDungeonAnarchistsCookbook = {
  id: "019db533-f390-7ec6-b1dc-b077006f9cd7",
  pageTypeSlug: "book",
  slug: "dungeon-crawler-carl-the-dungeon-anarchists-cookbook",
  title: "Dungeon Crawler Carl: The Dungeon Anarchist's Cookbook",
  kind: "read",
  status: "not-started",
  author: "Matt Dinniman",
  unitSlug: "words",
  position: 3,
  ownLength: 133500,
  publishedAt: "2021-04-02",
  partOfSlugs: ["book-series/dungeon-crawler-carl"],
  source: "kindle",
  externalId: "B08V4QSV6W",
  externalLink: "https://amazon.com/dp/B08V4QSV6W",
} as const satisfies Book
