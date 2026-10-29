import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS01e10 = {
  id: "01a18856-c98a-70ac-a301-ae1f2473c55f",
  type: "page-type/episode",
  slug: "the-defenders-s01e10",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-the-defenders-miniseries"],
  position: 10,
  publishedAt: "1961-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454019",
      externalLink: "https://www.themoviedb.org/tv/11515/season/1/episode/10",
    },
  ],
  title: "The Man with the Concrete Thumb",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
