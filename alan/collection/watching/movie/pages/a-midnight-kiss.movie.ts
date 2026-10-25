import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aMidnightKiss = {
  id: "01a17499-e800-7426-9f0d-e0f5fcec026b",
  type: "page-type/movie",
  slug: "a-midnight-kiss",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-12-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "550036",
      externalLink: "https://www.themoviedb.org/movie/550036",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Midnight Kiss",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9028890",
  posterPath: "/pSGONtCLhPuBs5L1yjqLUDptuXB.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
