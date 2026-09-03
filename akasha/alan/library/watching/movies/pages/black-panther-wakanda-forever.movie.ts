import type { Movie } from "../movie.page-type.ts"

export const blackPantherWakandaForever = {
  id: "01a06802-6d98-7019-92ee-3843296de5d0",
  pageTypeSlug: "movie",
  slug: "black-panther-wakanda-forever",
  title: "Black Panther: Wakanda Forever",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 39,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-11-11",
  externalLink: "https://trakt.tv/movies/black-panther-wakanda-forever-2022",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
