import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const blackPanther = {
  id: "01a06802-6d98-7018-b2c9-065abccfbdb8",
  type: "page-type/movie",
  slug: "black-panther",
  title: "Black Panther",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 18,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-02-16",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/black-panther-2018",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
