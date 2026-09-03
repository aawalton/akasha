import type { Movie } from "../movie.page-type.ts"

export const thorLoveAndThunder = {
  id: "01a06802-6d9a-7024-b762-c752d5d85c0d",
  pageTypeSlug: "movie",
  slug: "thor-love-and-thunder",
  title: "Thor: Love and Thunder",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 36,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-07-07",
  externalLink: "https://trakt.tv/movies/thor-love-and-thunder-2022",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
