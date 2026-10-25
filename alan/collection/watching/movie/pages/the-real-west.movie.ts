import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theRealWest = {
  id: "01a1749a-89ac-77fc-8001-94eb4545ec91",
  type: "page-type/movie",
  slug: "the-real-west",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1325869",
      externalLink: "https://www.themoviedb.org/movie/1325869",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Real West",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt33337070",
  posterPath: "/jWK45f5RqJdmpJYXNC2gHZ4sxz6.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
