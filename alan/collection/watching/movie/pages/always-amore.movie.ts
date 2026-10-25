import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const alwaysAmore = {
  id: "01a1749a-66bc-7d22-b050-e88a225718ab",
  type: "page-type/movie",
  slug: "always-amore",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "937110",
      externalLink: "https://www.themoviedb.org/movie/937110",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Always Amore",
  genres: ["TV Movie", "Romance", "Drama"],
  imdbId: "tt18181656",
  posterPath: "/dPJMl05qBhE98cwQz4TCfhPaQ2m.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
