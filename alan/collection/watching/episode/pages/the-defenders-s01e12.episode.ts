import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS01e12 = {
  id: "01a18856-c98a-7af8-9b06-e195031ad6e1",
  type: "page-type/episode",
  slug: "the-defenders-s01e12",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-the-defenders-miniseries"],
  position: 12,
  publishedAt: "1961-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453946",
      externalLink: "https://www.themoviedb.org/tv/11515/season/1/episode/12",
    },
  ],
  title: "Perjury",
  episodeType: "standard",
  voteAverage: 8,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
