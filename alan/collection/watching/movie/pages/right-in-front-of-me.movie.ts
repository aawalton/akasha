import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rightInFrontOfMe = {
  id: "01a1749a-259c-72d9-9968-337396296543",
  type: "page-type/movie",
  slug: "right-in-front-of-me",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "796000",
      externalLink: "https://www.themoviedb.org/movie/796000",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Right in Front of Me",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt14039078",
  posterPath: "/vzn6d9w3PqHLiTYXsfqlB4KQtsB.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
