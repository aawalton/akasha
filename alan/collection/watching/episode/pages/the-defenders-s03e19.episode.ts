import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS03e19 = {
  id: "01a18856-c98e-7367-9e08-d6ed84211674",
  type: "page-type/episode",
  slug: "the-defenders-s03e19",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-3"],
  position: 19,
  publishedAt: "1964-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "453983",
      externalLink: "https://www.themoviedb.org/tv/11515/season/3/episode/19",
    },
  ],
  title: "The Secret",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
