import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jingleBellRun = {
  id: "01a1749a-89a9-7808-93ae-a35e1f934e09",
  type: "page-type/movie",
  slug: "jingle-bell-run",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361135",
      externalLink: "https://www.themoviedb.org/movie/1361135",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jingle Bell Run",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt32432584",
  posterPath: "/rctASGYJTuAWVemZ4ZR1ZSj50T6.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
