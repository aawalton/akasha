import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const riseAndShineBenedictStone = {
  id: "01a1749a-464d-7a9a-a0f5-e9a0848bb25b",
  type: "page-type/movie",
  slug: "rise-and-shine-benedict-stone",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2021-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "858919",
      externalLink: "https://www.themoviedb.org/movie/858919",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Rise and Shine, Benedict Stone",
  genres: ["TV Movie", "Drama", "Family"],
  imdbId: "tt14940196",
  posterPath: "/aTxPfEp9U7gswUyhcPVE7jOi1Y9.jpg",
  voteAverage: 7.333,
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
