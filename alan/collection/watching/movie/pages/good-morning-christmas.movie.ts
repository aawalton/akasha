import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const goodMorningChristmas = {
  id: "01a1749a-06bc-7007-968b-0ac53481f645",
  type: "page-type/movie",
  slug: "good-morning-christmas",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2020-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "746043",
      externalLink: "https://www.themoviedb.org/movie/746043",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Good Morning Christmas!",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt13109730",
  posterPath: "/bbdAuRd893TvCiX4PGOLJLNMuhn.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
