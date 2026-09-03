import type { Movie } from "../movie.page-type.ts"

export const guardiansOfTheGalaxy = {
  id: "01a06802-6d99-7012-8010-1ee2341fde0f",
  pageTypeSlug: "movie",
  slug: "guardians-of-the-galaxy",
  title: "Guardians of the Galaxy",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2014-08-01",
  externalLink: "https://trakt.tv/movies/guardians-of-the-galaxy-2014",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
