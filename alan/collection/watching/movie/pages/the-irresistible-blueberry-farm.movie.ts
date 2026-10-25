import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theIrresistibleBlueberryFarm = {
  id: "01a17499-a7d8-75d9-866a-bd565857e24e",
  type: "page-type/movie",
  slug: "the-irresistible-blueberry-farm",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2016-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "418969",
      externalLink: "https://www.themoviedb.org/movie/418969",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Irresistible Blueberry Farm",
  genres: ["Romance", "Mystery", "TV Movie"],
  imdbId: "tt6131636",
  posterPath: "/aoGCzoEnc2cCJmveOI5Trwl50oq.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "VIX ",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
