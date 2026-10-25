import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fallingIntoPlace = {
  id: "01a1749a-c869-7b3f-a686-757d79c502a5",
  type: "page-type/movie",
  slug: "falling-into-place",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-09-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1742897",
      externalLink: "https://www.themoviedb.org/movie/1742897",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Falling into Place",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt43742678",
  posterPath: "/j9Tfk8PccwkhxyRcwa4QO6uGP37.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
