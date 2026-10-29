import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const sonOfTheDragonSeason1 = {
  id: "01a18852-27ee-72ba-a1f6-8d6a333573ad",
  type: "page-type/season",
  slug: "son-of-the-dragon-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/son-of-the-dragon"],
  position: 1,
  publishedAt: "2008-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "88521",
      externalLink: "https://www.themoviedb.org/tv/20409/season/1",
    },
  ],
  title: "Miniseries",
  posterPath: "/dHwOv62bWS1xRQ0oaUObG3ALYf8.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:47.982Z",
  updatedAt: "2026-10-29T15:40:47.982Z",
} as const satisfies Season
