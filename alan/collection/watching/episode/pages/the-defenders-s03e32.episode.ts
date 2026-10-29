import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS03e32 = {
  id: "01a18856-c98f-7884-86db-a03afd7564ab",
  type: "page-type/episode",
  slug: "the-defenders-s03e32",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-3"],
  position: 32,
  publishedAt: "1964-05-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454059",
      externalLink: "https://www.themoviedb.org/tv/11515/season/3/episode/32",
    },
  ],
  title: "The Fine Line",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
