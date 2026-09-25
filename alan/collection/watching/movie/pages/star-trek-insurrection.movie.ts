import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrekInsurrection = {
  id: "01a06802-6d99-703f-9f72-53390b9e87cc",
  type: "page-type/movie",
  slug: "star-trek-insurrection",
  title: "Star Trek: Insurrection",
  partOfCollections: ["fandom/star-trek-3"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1998-12-11",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-insurrection-1998",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
