import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS02e10 = {
  id: "01a18856-c98c-7e55-8be0-91eceee2f5d7",
  type: "page-type/episode",
  slug: "the-defenders-s02e10",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-2"],
  position: 10,
  publishedAt: "1962-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454065",
      externalLink: "https://www.themoviedb.org/tv/11515/season/2/episode/10",
    },
  ],
  title: "The Invisible Badge",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
