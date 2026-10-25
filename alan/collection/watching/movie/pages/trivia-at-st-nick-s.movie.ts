import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const triviaAtStNickS = {
  id: "01a1749a-89ac-76ee-a34c-ff68781a0d41",
  type: "page-type/movie",
  slug: "trivia-at-st-nick-s",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361125",
      externalLink: "https://www.themoviedb.org/movie/1361125",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Trivia at St. Nick's",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt33425050",
  posterPath: "/sjqt5494TyxFOlF2ImdSY4KjXvs.jpg",
  voteAverage: 5.6,
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
