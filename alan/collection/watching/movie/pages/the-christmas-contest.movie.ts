import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasContest = {
  id: "01a1749a-259e-748b-9de9-2a942ab445a2",
  type: "page-type/movie",
  slug: "the-christmas-contest",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874144",
      externalLink: "https://www.themoviedb.org/movie/874144",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Contest",
  genres: ["TV Movie", "Romance", "Drama", "Comedy"],
  imdbId: "tt15316422",
  posterPath: "/8qcRGnqeCyYFekRNAK4A366cbNF.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
