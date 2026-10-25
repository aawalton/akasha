import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aRoyalChristmas = {
  id: "01a17499-8943-73ce-b54a-52c7a55373c7",
  type: "page-type/movie",
  slug: "a-royal-christmas",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2014-11-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299582",
      externalLink: "https://www.themoviedb.org/movie/299582",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Royal_Christmas" },
  ],
  title: "A Royal Christmas",
  genres: ["TV Movie", "Romance", "Family"],
  imdbId: "tt2838678",
  posterPath: "/r7wDZesIEdn9UJgqBLzulbFRhCr.jpg",
  voteAverage: 6.676,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
