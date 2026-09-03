import type { Movie } from "../movie.page-type.ts"

export const battleForThePlanetOfTheApes = {
  id: "01a06802-6d98-7011-9776-f30ace6379cc",
  pageTypeSlug: "movie",
  slug: "battle-for-the-planet-of-the-apes",
  title: "Battle for the Planet of the Apes",
  partOfSlugs: ["planet-of-the-apes-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1973-06-15",
  externalLink: "https://trakt.tv/movies/battle-for-the-planet-of-the-apes-1973",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
