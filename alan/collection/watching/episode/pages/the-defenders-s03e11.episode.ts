import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS03e11 = {
  id: "01a18856-c98e-7984-a5df-ff1f1696ee01",
  type: "page-type/episode",
  slug: "the-defenders-s03e11",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-3"],
  position: 11,
  publishedAt: "1963-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453973",
      externalLink: "https://www.themoviedb.org/tv/11515/season/3/episode/11",
    },
  ],
  title: "The Crowd Pleaser",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
