import type { Movie } from "../movie.page-type.ts"

export const inTheBeginning = {
  id: "01a06802-6d99-701d-b11c-b4c330b79a85",
  pageTypeSlug: "movie",
  slug: "in-the-beginning",
  title: "In the Beginning",
  partOfSlugs: ["babylon-5-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1998-01-04",
  externalId: "babylon-5-in-the-beginning-1998",
  externalLink: "https://trakt.tv/movies/babylon-5-in-the-beginning-1998",
  lastSyncedAt: "2025-12-20",
} as const satisfies Movie
