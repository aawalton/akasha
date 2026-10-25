import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInMontana = {
  id: "01a1749a-06ba-7572-9161-4b0bbfe413ae",
  type: "page-type/movie",
  slug: "christmas-in-montana",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "631409",
      externalLink: "https://www.themoviedb.org/movie/631409",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Montana",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt11151688",
  posterPath: "/1HgFtSe6Ti5vHIB8CEjAD9HcYwj.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
