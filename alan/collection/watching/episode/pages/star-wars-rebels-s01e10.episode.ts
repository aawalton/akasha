import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e10 = {
  id: "01a18853-ddfc-7e1c-89fa-acef2585ba7e",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e10",
  description:
    "While attending a gathering for those who would oppose the Empire, the crew finds out something unexpected.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 10,
  publishedAt: "2015-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1041354",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/10",
    },
  ],
  title: "Vision of Hope",
  episodeType: "standard",
  stillPath: "/95BJbgJfcB3HzCHRuOMDOvfpEzi.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
