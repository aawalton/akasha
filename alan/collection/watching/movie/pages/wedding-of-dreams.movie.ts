import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weddingOfDreams = {
  id: "01a17499-c960-7580-bf1d-a33c1a0efe06",
  type: "page-type/movie",
  slug: "wedding-of-dreams",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["franchise/summer-of-dreams"],
  position: 1,
  publishedAt: "2018-09-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "543328",
      externalLink: "https://www.themoviedb.org/movie/543328",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Wedding of Dreams",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8351424",
  posterPath: "/l7W0SGzC2a0wqfbgA8lpwESQQfY.jpg",
  voteAverage: 4.64,
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
