import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasWithTheSinghs = {
  id: "01a1749a-89a7-7ac9-a49d-03a507e687eb",
  type: "page-type/movie",
  slug: "christmas-with-the-singhs",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361132",
      externalLink: "https://www.themoviedb.org/movie/1361132",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas with the Singhs",
  genres: ["Romance", "Comedy", "Family", "TV Movie"],
  imdbId: "tt32730893",
  posterPath: "/frgS14bRTultXUbEMhqNUo8wsYs.jpg",
  voteAverage: 5.9,
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
