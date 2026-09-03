import type { Movie } from "../movie.page-type.ts"

export const avengersEndgame = {
  id: "01a06802-6d98-700a-a882-182e17edc545",
  pageTypeSlug: "movie",
  slug: "avengers-endgame",
  title: "Avengers: Endgame",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2019-04-26",
  externalLink: "https://trakt.tv/movies/avengers-endgame-2019",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
