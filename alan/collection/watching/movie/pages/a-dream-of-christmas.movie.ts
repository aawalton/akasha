import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aDreamOfChristmas = {
  id: "01a17499-a7d2-7bdf-afc8-dfa25352c7f2",
  type: "page-type/movie",
  slug: "a-dream-of-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2016-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "421761",
      externalLink: "https://www.themoviedb.org/movie/421761",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Dream of Christmas",
  genres: ["Drama", "Romance", "TV Movie"],
  imdbId: "tt6279602",
  posterPath: "/zArq5FAPcaMPe1xv6b0ZmDEyK9a.jpg",
  voteAverage: 6.3,
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
