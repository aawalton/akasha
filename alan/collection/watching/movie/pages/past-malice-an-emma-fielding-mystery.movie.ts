import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const pastMaliceAnEmmaFieldingMystery = {
  id: "01a17499-e805-79d9-a1ef-a95e803c67f1",
  type: "page-type/movie",
  slug: "past-malice-an-emma-fielding-mystery",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/emma-fielding-mystery"],
  position: 1,
  publishedAt: "2018-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "494467",
      externalLink: "https://www.themoviedb.org/movie/494467",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Past Malice: An Emma Fielding Mystery",
  genres: ["Mystery", "Crime", "Drama", "TV Movie"],
  imdbId: "tt7879372",
  posterPath: "/jLex3GzVQ7VJBZkVOZfI3rPGBJn.jpg",
  voteAverage: 6.455,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
