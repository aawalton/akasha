import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const timeForThemToComeHomeForChristmas = {
  id: "01a1749a-464e-7e3f-86af-a4c391ec653e",
  type: "page-type/movie",
  slug: "time-for-them-to-come-home-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "874230",
      externalLink: "https://www.themoviedb.org/movie/874230",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Time for Them to Come Home for Christmas",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt16047670",
  posterPath: "/oV5r8NlY2qJbttdoH0kVd3q2AnI.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
