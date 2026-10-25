import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const caribbeanSummer = {
  id: "01a1749a-4649-75a7-8af3-17ffbd8e6abf",
  type: "page-type/movie",
  slug: "caribbean-summer",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-06-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "970896",
      externalLink: "https://www.themoviedb.org/movie/970896",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Caribbean Summer",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt20114622",
  posterPath: "/2kiRSeVBL4PC2W34ZcICA6zetUT.jpg",
  voteAverage: 6.2,
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
