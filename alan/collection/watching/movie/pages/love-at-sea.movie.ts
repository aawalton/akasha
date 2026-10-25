import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveAtSea = {
  id: "01a17499-c95d-703e-a7a7-0a193efaa812",
  type: "page-type/movie",
  slug: "love-at-sea",
  ownLength: 80,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-08-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "525455",
      externalLink: "https://www.themoviedb.org/movie/525455",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love at Sea",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7936538",
  posterPath: "/41mk7H29izbdWfrA9uY3bXSPweY.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
