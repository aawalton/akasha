import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const longLostChristmas = {
  id: "01a1749a-66be-7d25-b406-c4e68bac07e5",
  type: "page-type/movie",
  slug: "long-lost-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028539",
      externalLink: "https://www.themoviedb.org/movie/1028539",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Long Lost Christmas",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22307560",
  posterPath: "/ep92klyhq5ePnHxsm7Psn6UPDF8.jpg",
  voteAverage: 7.1,
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
