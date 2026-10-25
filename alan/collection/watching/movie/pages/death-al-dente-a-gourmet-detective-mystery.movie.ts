import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const deathAlDenteAGourmetDetectiveMystery = {
  id: "01a17499-a7d4-7505-9588-526b4831d9f9",
  type: "page-type/movie",
  slug: "death-al-dente-a-gourmet-detective-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/gourmet-detective"],
  position: 2,
  publishedAt: "2016-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "414767",
      externalLink: "https://www.themoviedb.org/movie/414767",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Death Al Dente: A Gourmet Detective Mystery",
  genres: ["Drama", "TV Movie", "Mystery", "Crime"],
  imdbId: "tt4143270",
  posterPath: "/22uie0izdEi1rOAKfkP5wRdkhjA.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
