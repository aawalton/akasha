import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const bigSkyRiver = {
  id: "01a1749a-66bc-7495-8173-b3ac28fb5758",
  type: "page-type/movie",
  slug: "big-sky-river",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/big-sky-river"],
  position: 1,
  publishedAt: "2022-08-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "999104",
      externalLink: "https://www.themoviedb.org/movie/999104",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Big Sky River",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt21298322",
  posterPath: "/64xEn5k3clTLflvNGndaI6xZZS3.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T20:45:22.183Z",
} as const satisfies Movie
