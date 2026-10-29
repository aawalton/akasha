import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sonOfTheDragonS01e01 = {
  id: "01a18852-27ee-77d5-9867-1976e40efc8d",
  type: "page-type/episode",
  slug: "son-of-the-dragon-s01e01",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["season/son-of-the-dragon-season-1"],
  position: 1,
  publishedAt: "2008-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1318601",
      externalLink: "https://www.themoviedb.org/tv/20409/season/1/episode/1",
    },
  ],
  title: "Part 1",
  episodeType: "standard",
  stillPath: "/zSJOpXJf9qEBATFFZ7YwJRNuFUh.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:47.982Z",
  updatedAt: "2026-10-29T15:40:47.982Z",
} as const satisfies Episode
