import type { Movie } from "../movie.page-type.ts"

export const dune = {
  id: "01a06802-6d99-7006-839b-7568e9b4f4af",
  pageTypeSlug: "movie",
  slug: "dune",
  title: "Dune",
  partOfSlugs: ["dune-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1984-12-14",
  externalLink: "https://trakt.tv/movies/dune-1984",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
