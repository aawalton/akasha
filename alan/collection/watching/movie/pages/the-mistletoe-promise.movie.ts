import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theMistletoePromise = {
  id: "01a17499-a7d8-792d-a847-01a576c8e10a",
  type: "page-type/movie",
  slug: "the-mistletoe-promise",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-mistletoe"],
  position: 0,
  publishedAt: "2016-11-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "410315",
      externalLink: "https://www.themoviedb.org/movie/410315",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Mistletoe Promise",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt5921218",
  posterPath: "/lyWtlPVrL5vuSfTNqwOXhHHSh8k.jpg",
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
