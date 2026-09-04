import type { Movie } from "../movie.page-type.ts"

export const battlestarGalacticaThePlan = {
  id: "01a06802-6d98-7014-a550-dad232e29485",
  pageTypeSlug: "movie",
  slug: "battlestar-galactica-the-plan",
  title: "Battlestar Galactica: The Plan",
  partOfSlugs: ["battlestar-galactica"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-10-27",
  externalLink: "https://trakt.tv/movies/battlestar-galactica-the-plan-2009",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
