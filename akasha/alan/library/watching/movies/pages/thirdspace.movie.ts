import type { Movie } from "../movie.page-type.ts"

export const thirdspace = {
  id: "01a06802-6d9a-7022-b129-969fff370962",
  pageTypeSlug: "movie",
  slug: "thirdspace",
  title: "Thirdspace",
  partOfSlugs: ["babylon-5-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1998-07-19",
  externalId: "babylon-5-thirdspace-1998",
  externalLink: "https://trakt.tv/movies/babylon-5-thirdspace-1998",
  lastSyncedAt: "2025-12-20",
} as const satisfies Movie
