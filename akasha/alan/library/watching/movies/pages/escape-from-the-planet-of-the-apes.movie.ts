import type { Movie } from "../movie.page-type.ts"

export const escapeFromThePlanetOfTheApes = {
  id: "01a06802-6d99-700a-bbe6-81f2c77e6dd0",
  pageTypeSlug: "movie",
  slug: "escape-from-the-planet-of-the-apes",
  title: "Escape from the Planet of the Apes",
  partOfSlugs: ["planet-of-the-apes-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1971-05-20",
  externalLink: "https://trakt.tv/movies/escape-from-the-planet-of-the-apes-1971",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
