import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jazzRamseyAK9Mystery = {
  id: "01a1749a-a94b-7c93-9c3c-98c1300bb028",
  type: "page-type/movie",
  slug: "jazz-ramsey-a-k-9-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2024-08-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1310509",
      externalLink: "https://www.themoviedb.org/movie/1310509",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jazz Ramsey: A K-9 Mystery",
  genres: ["Mystery"],
  imdbId: "tt32890175",
  posterPath: "/pdxAyYYPEAUwG2qPIHLIHGEReTP.jpg",
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
