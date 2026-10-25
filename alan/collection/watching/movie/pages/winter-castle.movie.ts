import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const winterCastle = {
  id: "01a17499-e807-71ed-8bea-d9bcd46b2782",
  type: "page-type/movie",
  slug: "winter-castle",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "570186",
      externalLink: "https://www.themoviedb.org/movie/570186",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Winter Castle",
  genres: ["TV Movie", "Romance", "Comedy"],
  imdbId: "tt9287492",
  posterPath: "/2th61cu88aJld83u1dEiuSW1107.jpg",
  voteAverage: 6.8,
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
