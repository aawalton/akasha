import type { Movie } from "../movie.page-type.ts"

export const spiderManHomecoming = {
  id: "01a06802-6d99-7037-9cf9-9bbc5f009f55",
  pageTypeSlug: "movie",
  slug: "spider-man-homecoming",
  title: "Spider-Man: Homecoming",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 16,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2017-07-07",
  externalLink: "https://trakt.tv/movies/spider-man-homecoming-2017",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
