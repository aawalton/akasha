import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const weddingMarch4SomethingOldSomethingNew = {
  id: "01a17499-c960-75da-bb8c-27779f3a0c29",
  type: "page-type/movie",
  slug: "wedding-march-4-something-old-something-new",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-wedding-march"],
  position: 3,
  publishedAt: "2018-06-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "529377",
      externalLink: "https://www.themoviedb.org/movie/529377",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Wedding March 4: Something Old, Something New",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt8456396",
  posterPath: "/nqxrUJN6O3kh9Vq1f7RuhKw5Mdv.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
