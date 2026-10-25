import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const warmingUpToYou = {
  id: "01a1749a-464f-735b-8a88-329f7071d65b",
  type: "page-type/movie",
  slug: "warming-up-to-you",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "877822",
      externalLink: "https://www.themoviedb.org/movie/877822",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Warming Up to You",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt14416016",
  posterPath: "/67ThgAv7wnqg3PrMYf9baRH0ejm.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
