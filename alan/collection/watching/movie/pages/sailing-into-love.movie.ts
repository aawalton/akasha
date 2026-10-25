import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sailingIntoLove = {
  id: "01a17499-e806-7dac-9ff3-96924805feee",
  type: "page-type/movie",
  slug: "sailing-into-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-05-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "594696",
      externalLink: "https://www.themoviedb.org/movie/594696",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sailing into Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10136854",
  posterPath: "/3yhWjjtpmGOLwjn3XTiFDM8Kxq0.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
