import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aCallToArms = {
  id: "01a06802-6d98-7000-b9ae-02f3ef8b4c25",
  type: "page-type/movie",
  slug: "a-call-to-arms",
  title: "A Call to Arms",
  partOfCollections: ["fandom/babylon-5-2"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1999-01-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "babylon-5-a-call-to-arms-1999",
      externalLink: "https://trakt.tv/movies/babylon-5-a-call-to-arms-1999",
      lastSyncedAt: "2025-12-20",
    },
  ],
  createdAt: "2026-09-03T16:03:04.728Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
