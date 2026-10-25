import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const whenLoveSprings = {
  id: "01a1749a-66c2-79a1-94fb-c7db813f77d4",
  type: "page-type/movie",
  slug: "when-love-springs",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1067821",
      externalLink: "https://www.themoviedb.org/movie/1067821",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "When Love Springs",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt24484852",
  posterPath: "/pO6JD9rLK0ndPnO4nqpcsOrmmbs.jpg",
  voteAverage: 6.5,
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
