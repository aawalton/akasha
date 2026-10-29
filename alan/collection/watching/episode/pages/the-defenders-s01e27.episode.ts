import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theDefendersS01e27 = {
  id: "01a18856-c98b-7341-bdd0-05b398b1eeae",
  type: "page-type/episode",
  slug: "the-defenders-s01e27",
  description:
    "Arthur Hill plays a man with six months to live--he kills his business partner in a fit of rage when the man refuses to help support his family after he has died.",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-the-defenders-miniseries"],
  position: 27,
  publishedAt: "1962-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "454026",
      externalLink: "https://www.themoviedb.org/tv/11515/season/1/episode/27",
    },
  ],
  title: "The Last Six Months",
  episodeType: "standard",
  voteAverage: 9,
  createdAt: "2026-10-29T15:45:51.498Z",
  updatedAt: "2026-10-29T15:45:51.498Z",
} as const satisfies Episode
