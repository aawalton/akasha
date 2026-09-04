import type { Movie } from "../movie.page-type.ts"

export const conquestOfThePlanetOfTheApes = {
  id: "01a06802-6d99-7000-915a-48750bb813d6",
  pageTypeSlug: "movie",
  slug: "conquest-of-the-planet-of-the-apes",
  title: "Conquest of the Planet of the Apes",
  partOfSlugs: ["planet-of-the-apes-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "1972-06-29",
  externalLink: "https://trakt.tv/movies/conquest-of-the-planet-of-the-apes-1972",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
