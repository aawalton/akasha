import type { Movie } from "../movie.page-type.ts"

export const captainAmericaTheFirstAvenger = {
  id: "01a06802-6d98-701e-a55f-7e816071adaf",
  pageTypeSlug: "movie",
  slug: "captain-america-the-first-avenger",
  title: "Captain America: The First Avenger",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2011-07-22",
  externalLink: "https://trakt.tv/movies/captain-america-the-first-avenger-2011",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
