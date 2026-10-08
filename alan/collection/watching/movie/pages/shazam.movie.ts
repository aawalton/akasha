import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const shazam = {
  id: "01a06802-6d99-7033-844f-7092afd3efd3",
  type: "page-type/movie",
  slug: "shazam",
  title: "Shazam!",
  partOfCollections: ["fandom/dc-extended-universe"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-04-05",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/shazam-2019",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
