import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const timeForHerToComeHomeForChristmas = {
  id: "01a1749a-89ac-706b-afc9-82b3bcf7857c",
  type: "page-type/movie",
  slug: "time-for-her-to-come-home-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1142775",
      externalLink: "https://www.themoviedb.org/movie/1142775",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Time for Her to Come Home for Christmas",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt29513328",
  posterPath: "/t92TNgjLUWA2abTOM1aF8jilUPZ.jpg",
  voteAverage: 6.9,
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
