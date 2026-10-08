import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ironMan3 = {
  id: "01a06802-6d99-7020-8aaa-2b641730111f",
  type: "page-type/movie",
  slug: "iron-man-3",
  title: "Iron Man 3",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-05-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/iron-man-3-2013",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
