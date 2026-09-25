import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const captainMarvel = {
  id: "01a06802-6d98-7020-bfd7-db9134cfb9af",
  type: "page-type/movie",
  slug: "captain-marvel",
  title: "Captain Marvel",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 21,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-03-08",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/captain-marvel-2019",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
