import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dungeonCrawlerCarlThisInevitableRuin = {
  id: "019db533-f390-7ee8-ac15-c0dd9fe3a9f2",
  type: "page-type/book",
  slug: "dungeon-crawler-carl-this-inevitable-ruin",
  title: "Dungeon Crawler Carl: This Inevitable Ruin",
  status: "not-started",
  author: "Matt Dinniman",
  unit: "unit/words",
  position: 7,
  ownLength: 181000,
  publishedAt: "2024-11-11",
  partOfCollections: ["book-series/dungeon-crawler-carl"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DJWKWV8W",
      externalLink: "https://amazon.com/dp/B0DJWKWV8W",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
