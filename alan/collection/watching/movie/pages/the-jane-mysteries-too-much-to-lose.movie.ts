import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theJaneMysteriesTooMuchToLose = {
  id: "01a1749a-a94d-7654-b2ff-fc1588996290",
  type: "page-type/movie",
  slug: "the-jane-mysteries-too-much-to-lose",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["franchise/the-jane-mysteries"],
  position: 3,
  publishedAt: "2024-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1329926",
      externalLink: "https://www.themoviedb.org/movie/1329926",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Jane Mysteries: Too Much to Lose",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt33132332",
  posterPath: "/ilsmHTWk7fTnx2CEZU0EzQAyUCr.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
