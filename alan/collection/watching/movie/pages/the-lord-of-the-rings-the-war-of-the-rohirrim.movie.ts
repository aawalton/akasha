import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theLordOfTheRingsTheWarOfTheRohirrim = {
  id: "01a06802-6d9a-701a-b500-f43d789bf451",
  type: "page-type/movie",
  slug: "the-lord-of-the-rings-the-war-of-the-rohirrim",
  title: "The Lord of the Rings: The War of the Rohirrim",
  partOfCollections: ["show-collection/the-lord-of-the-rings-shows"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2024-12-13",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-lord-of-the-rings-the-war-of-the-rohirrim-2024",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.730Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
