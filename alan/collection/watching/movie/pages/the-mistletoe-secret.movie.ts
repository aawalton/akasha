import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theMistletoeSecret = {
  id: "01a17499-e806-7b67-97b9-ecd8a1922e76",
  type: "page-type/movie",
  slug: "the-mistletoe-secret",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["franchise/the-mistletoe"],
  position: 2,
  publishedAt: "2019-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "631420",
      externalLink: "https://www.themoviedb.org/movie/631420",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Mistletoe Secret",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10768348",
  posterPath: "/upyKcV61QJGIZFLXvACcCQVixAm.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
