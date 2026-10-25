import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mySweetAustrianHoliday = {
  id: "01a1749a-a94b-7555-ae3e-d923d5e08f34",
  type: "page-type/movie",
  slug: "my-sweet-austrian-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-10-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1360774",
      externalLink: "https://www.themoviedb.org/movie/1360774",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Sweet Austrian Holiday",
  genres: ["Romance"],
  imdbId: "tt33503214",
  posterPath: "/lTiUeuMGUTxnVkCTTTriB3MxZWC.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
