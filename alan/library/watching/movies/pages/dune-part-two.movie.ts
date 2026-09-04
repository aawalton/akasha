import type { Movie } from "../movie.page-type.ts"

export const dunePartTwo = {
  id: "01a06802-6d99-7008-a782-4d9bc8eb0bea",
  pageTypeSlug: "movie",
  slug: "dune-part-two",
  title: "Dune: Part Two",
  partOfSlugs: ["dune-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-03-01",
  externalLink: "https://trakt.tv/movies/dune-part-two-2024",
  lastSyncedAt: "2025-09-30",
} as const satisfies Movie
