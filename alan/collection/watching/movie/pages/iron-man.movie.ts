import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ironMan = {
  id: "01a06802-6d99-701e-8b66-b530336fc1b0",
  type: "page-type/movie",
  slug: "iron-man",
  title: "Iron Man",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-05-02",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/iron-man-2008",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
