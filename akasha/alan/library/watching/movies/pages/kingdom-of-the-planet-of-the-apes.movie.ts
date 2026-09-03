import type { Movie } from "../movie.page-type.ts"

export const kingdomOfThePlanetOfTheApes = {
  id: "01a06802-6d99-7022-892b-386d304b91a6",
  pageTypeSlug: "movie",
  slug: "kingdom-of-the-planet-of-the-apes",
  title: "Kingdom of the Planet of the Apes",
  partOfSlugs: ["planet-of-the-apes-2"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-05-10",
  externalLink: "https://trakt.tv/movies/kingdom-of-the-planet-of-the-apes-2024",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
