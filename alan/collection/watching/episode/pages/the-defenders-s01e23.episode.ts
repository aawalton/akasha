import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS01e23 = {
  id: "01a18856-c98b-71e4-b04f-6441ae73d4e7",
  type: "page-type/episode",
  slug: "the-defenders-s01e23",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-the-defenders-miniseries"],
  position: 23,
  publishedAt: "1962-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454025",
      externalLink: "https://www.themoviedb.org/tv/11515/season/1/episode/23",
    },
  ],
  title: "The Crusader",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
