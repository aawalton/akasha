import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const blackWidow = {
  id: "01a06802-6d98-701a-af5a-d8dd203e317b",
  type: "page-type/movie",
  slug: "black-widow",
  title: "Black Widow",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 24,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-07-09",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/black-widow-2021",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
