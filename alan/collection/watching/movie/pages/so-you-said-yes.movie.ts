import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const soYouSaidYes = {
  id: "01a17499-8949-7acc-97f1-6c433c0a601e",
  type: "page-type/movie",
  slug: "so-you-said-yes",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-02-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "317119",
      externalLink: "https://www.themoviedb.org/movie/317119",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "So You Said Yes",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt4185152",
  posterPath: "/qJE49blpMq2OTsaZ1rL7cyE0vhV.jpg",
  voteAverage: 5.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
