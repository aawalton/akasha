import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const avengersEndgame = {
  id: "01a06802-6d98-700a-a882-182e17edc545",
  type: "page-type/movie",
  slug: "avengers-endgame",
  title: "Avengers: Endgame",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-04-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/avengers-endgame-2019",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
