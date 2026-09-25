import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const blackPantherWakandaForever = {
  id: "01a06802-6d98-7019-92ee-3843296de5d0",
  type: "page-type/movie",
  slug: "black-panther-wakanda-forever",
  title: "Black Panther: Wakanda Forever",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 39,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-11-11",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/black-panther-wakanda-forever-2022",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
