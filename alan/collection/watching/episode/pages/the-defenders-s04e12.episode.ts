import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e12 = {
  id: "01a18856-c990-7d5c-aeaa-b668dc89175f",
  type: "page-type/episode",
  slug: "the-defenders-s04e12",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 12,
  publishedAt: "1964-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454030",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/12",
    },
  ],
  title: "A Voice Loud and Clear",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
