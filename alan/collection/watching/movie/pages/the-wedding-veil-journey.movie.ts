import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWeddingVeilJourney = {
  id: "01a1749a-66c1-7a37-917a-6269d1dd6494",
  type: "page-type/movie",
  slug: "the-wedding-veil-journey",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-wedding-veil"],
  position: 6,
  publishedAt: "2023-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1056738",
      externalLink: "https://www.themoviedb.org/movie/1056738",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Wedding Veil Journey",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt25134270",
  posterPath: "/uTjk3NTwKWlsMEjWKPKNxCyywTs.jpg",
  voteAverage: 7.3,
  streamingOn: ["Philo", "fuboTV"],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T20:45:22.183Z",
} as const satisfies Movie
