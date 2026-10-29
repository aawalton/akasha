import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS01e04 = {
  id: "01a18856-c98a-7847-866b-e95b890389bc",
  type: "page-type/episode",
  slug: "the-defenders-s01e04",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-the-defenders-miniseries"],
  position: 4,
  publishedAt: "1961-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454012",
      externalLink: "https://www.themoviedb.org/tv/11515/season/1/episode/4",
    },
  ],
  title: "The Riot",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
