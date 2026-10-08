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
  createdAt: "2026-09-03T16:03:04.728Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
