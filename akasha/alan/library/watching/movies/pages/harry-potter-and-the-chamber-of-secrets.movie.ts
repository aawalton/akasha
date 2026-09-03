import type { Movie } from "../movie.page-type.ts"

export const harryPotterAndTheChamberOfSecrets = {
  id: "01a06802-6d99-7015-912c-433476ecfeed",
  pageTypeSlug: "movie",
  slug: "harry-potter-and-the-chamber-of-secrets",
  title: "Harry Potter and the Chamber of Secrets",
  partOfSlugs: ["harry-potter-movie-series"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2002-11-15",
  externalLink: "https://trakt.tv/movies/harry-potter-and-the-chamber-of-secrets-2002",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
