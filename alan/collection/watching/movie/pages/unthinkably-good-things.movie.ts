import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const unthinkablyGoodThings = {
  id: "01a1749a-66c2-7e7a-b6ce-0eb7d40a42b6",
  type: "page-type/movie",
  slug: "unthinkably-good-things",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-08-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "953239",
      externalLink: "https://www.themoviedb.org/movie/953239",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Unthinkably Good Things",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt18955596",
  posterPath: "/lXZP2PGq4CwiuXUqP15x0Kw2qsr.jpg",
  voteAverage: 5.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
