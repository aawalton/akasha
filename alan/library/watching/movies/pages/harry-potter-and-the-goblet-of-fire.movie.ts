import type { Movie } from "../movie.page-type.ts"

export const harryPotterAndTheGobletOfFire = {
  id: "01a06802-6d99-7018-a0e4-1be48b404874",
  pageTypeSlug: "movie",
  slug: "harry-potter-and-the-goblet-of-fire",
  title: "Harry Potter and the Goblet of Fire",
  partOfSlugs: ["harry-potter-movie-series"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2005-11-18",
  externalLink: "https://trakt.tv/movies/harry-potter-and-the-goblet-of-fire-2005",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
