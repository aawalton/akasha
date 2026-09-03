import type { Movie } from "../movie.page-type.ts"

export const allTheBrightPlaces = {
  id: "01a06802-6d98-7002-915f-2612d5fd49eb",
  pageTypeSlug: "movie",
  slug: "all-the-bright-places",
  title: "All the Bright Places",
  partOfSlugs: ["watch-with-jen"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-02-28",
  externalId: "all-the-bright-places-2020",
  externalLink: "https://app.trakt.tv/movies/all-the-bright-places-2020",
  lastSyncedAt: "2025-11-06",
} as const satisfies Movie
