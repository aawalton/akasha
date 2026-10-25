import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const blindDateBookClub = {
  id: "01a1749a-89a7-7c1e-813b-db4b8fd2bc76",
  type: "page-type/movie",
  slug: "blind-date-book-club",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2024-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1249342",
      externalLink: "https://www.themoviedb.org/movie/1249342",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Blind Date Book Club",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt30505839",
  posterPath: "/9fwY72YdYuQW8hzC3bQXFVc8QRi.jpg",
  voteAverage: 7.104,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
