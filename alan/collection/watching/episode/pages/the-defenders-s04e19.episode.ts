import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS04e19 = {
  id: "01a18856-c990-7338-bf4e-e2908055b676",
  type: "page-type/episode",
  slug: "the-defenders-s04e19",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/the-defenders-season-4"],
  position: 19,
  publishedAt: "1965-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454033",
      externalLink: "https://www.themoviedb.org/tv/11515/season/4/episode/19",
    },
  ],
  title: "The Objector",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
