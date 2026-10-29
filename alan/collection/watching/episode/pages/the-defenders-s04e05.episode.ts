import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e05 = {
  id: "01a18856-c98f-7c43-af5b-064c8cd6bff8",
  type: "page-type/episode",
  slug: "the-defenders-s04e05",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 5,
  publishedAt: "1964-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453962",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/5",
    },
  ],
  title: "Conflict of Interests",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
