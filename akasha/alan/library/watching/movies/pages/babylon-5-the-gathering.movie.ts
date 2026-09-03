import type { Movie } from "../movie.page-type.ts"

export const babylon5TheGathering = {
  id: "01a06802-6d98-700c-bf73-58a4ed5bfe7c",
  pageTypeSlug: "movie",
  slug: "babylon-5-the-gathering",
  title: "Babylon 5: The Gathering",
  partOfSlugs: ["babylon-5-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1993-02-22",
  externalId: "babylon-5-the-gathering-1993",
  externalLink: "https://trakt.tv/movies/babylon-5-the-gathering-1993",
  lastSyncedAt: "2025-12-20",
} as const satisfies Movie
