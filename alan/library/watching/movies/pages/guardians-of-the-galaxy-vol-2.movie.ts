import type { Movie } from "../movie.page-type.ts"

export const guardiansOfTheGalaxyVol2 = {
  id: "01a06802-6d99-7013-8c4d-9148018e7c09",
  pageTypeSlug: "movie",
  slug: "guardians-of-the-galaxy-vol-2",
  title: "Guardians of the Galaxy Vol. 2",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2017-05-05",
  externalLink: "https://trakt.tv/movies/guardians-of-the-galaxy-vol-2-2017",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
