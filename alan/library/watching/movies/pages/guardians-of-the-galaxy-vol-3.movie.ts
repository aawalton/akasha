import type { Movie } from "../movie.page-type.ts"

export const guardiansOfTheGalaxyVol3 = {
  id: "01a06802-6d99-7014-af61-e8447a4160da",
  pageTypeSlug: "movie",
  slug: "guardians-of-the-galaxy-vol-3",
  title: "Guardians of the Galaxy Vol. 3",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 43,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2023-05-05",
  externalLink: "https://trakt.tv/movies/guardians-of-the-galaxy-volume-3-2023",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
