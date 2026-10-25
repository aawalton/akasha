import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const headOverHeels = {
  id: "01a1749a-89a9-7e09-94d6-2ca62e5bb69e",
  type: "page-type/movie",
  slug: "head-over-heels",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-08-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1310508",
      externalLink: "https://www.themoviedb.org/movie/1310508",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Head Over Heels",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt33062428",
  posterPath: "/srk8toCnwMOyLIKOdMVXifY8ytK.jpg",
  voteAverage: 6.462,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
