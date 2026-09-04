import type { Movie } from "../movie.page-type.ts"

export const doctorWho1996 = {
  id: "01a06802-6d99-7005-a920-b1bff45a1eeb",
  pageTypeSlug: "movie",
  slug: "doctor-who-1996",
  title: "Doctor Who (1996)",
  partOfSlugs: ["doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1996-05-14",
  externalLink: "https://trakt.tv/movies/doctor-who-1996",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
