import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS03e02 = {
  id: "01a18856-c98d-7d09-8684-e43d72b27870",
  type: "page-type/episode",
  slug: "the-defenders-s03e02",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-3"],
  position: 2,
  publishedAt: "1963-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454048",
      externalLink: "https://www.themoviedb.org/tv/11515/season/3/episode/2",
    },
  ],
  title: "The Empty Heart",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
