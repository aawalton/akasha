import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const makingWaves = {
  id: "01a1749a-66bf-7140-8fa7-8e112cd42440",
  type: "page-type/movie",
  slug: "making-waves",
  ownLength: 11,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-08-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1150793",
      externalLink: "https://www.themoviedb.org/movie/1150793",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Making Waves",
  posterPath: "/pTJY0VnzMm0UmR7CSagjRkdIp6H.jpg",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
