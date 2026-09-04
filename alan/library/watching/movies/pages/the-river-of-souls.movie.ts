import type { Movie } from "../movie.page-type.ts"

export const theRiverOfSouls = {
  id: "01a06802-6d9a-701e-b9d0-4d7b39caa1fa",
  pageTypeSlug: "movie",
  slug: "the-river-of-souls",
  title: "The River of Souls",
  partOfSlugs: ["babylon-5-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1998-11-08",
  externalId: "babylon-5-the-river-of-souls-1998",
  externalLink: "https://trakt.tv/movies/babylon-5-the-river-of-souls-1998",
  lastSyncedAt: "2025-12-20",
} as const satisfies Movie
