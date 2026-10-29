import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e10 = {
  id: "01a18853-f9af-7e80-ba5f-37310d1ccd89",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e10",
  description:
    "When Poe and Kaz find an old First Order mining facility, BB-8 discovers the facility isn’t so abandoned.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 10,
  publishedAt: "2018-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1627257",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/10",
    },
  ],
  title: "Station Theta Black",
  episodeType: "standard",
  stillPath: "/xYRq1JI8yi5LRgjheSjltKxM5wu.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
