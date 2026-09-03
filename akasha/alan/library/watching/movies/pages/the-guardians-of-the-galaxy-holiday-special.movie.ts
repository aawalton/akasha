import type { Movie } from "../movie.page-type.ts"

export const theGuardiansOfTheGalaxyHolidaySpecial = {
  id: "01a06802-6d9a-7010-a71a-5d02448bde2b",
  pageTypeSlug: "movie",
  slug: "the-guardians-of-the-galaxy-holiday-special",
  title: "The Guardians of the Galaxy Holiday Special",
  partOfSlugs: ["marvel-cinematic-universe"],
  position: 40,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-11-25",
  externalLink: "https://trakt.tv/movies/the-guardians-of-the-galaxy-holiday-special-2022",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
