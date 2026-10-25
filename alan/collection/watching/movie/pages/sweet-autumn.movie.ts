import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sweetAutumn = {
  id: "01a1749a-06bf-78e0-b7ff-56d82efbc0e1",
  type: "page-type/movie",
  slug: "sweet-autumn",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "737684",
      externalLink: "https://www.themoviedb.org/movie/737684",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sweet Autumn",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt13057170",
  posterPath: "/pNiwExRiyf2Kd6B7ButFiQUQ6p2.jpg",
  voteAverage: 7.02,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
