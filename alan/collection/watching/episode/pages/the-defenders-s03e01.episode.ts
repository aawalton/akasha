import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS03e01 = {
  id: "01a18856-c98d-7924-9aae-35f6a3698829",
  type: "page-type/episode",
  slug: "the-defenders-s03e01",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-3"],
  position: 1,
  publishedAt: "1963-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454041",
      externalLink: "https://www.themoviedb.org/tv/11515/season/3/episode/1",
    },
  ],
  title: "The Weeping Baboon",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
