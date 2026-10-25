import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const onceUponAPrince = {
  id: "01a17499-c95e-7469-9c83-93f25a75aafa",
  type: "page-type/movie",
  slug: "once-upon-a-prince",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "516846",
      externalLink: "https://www.themoviedb.org/movie/516846",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Once Upon a Prince",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt8250512",
  posterPath: "/lfDUbBcNncvxj4SWYQvo8VjOJkT.jpg",
  voteAverage: 6.537,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
