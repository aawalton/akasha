import type { Movie } from "../movie.page-type.ts"

export const battlestarGalacticaBloodAndChrome = {
  id: "01a06802-6d98-7012-9596-d1f24b2fd223",
  pageTypeSlug: "movie",
  slug: "battlestar-galactica-blood-and-chrome",
  title: "Battlestar Galactica: Blood & Chrome",
  partOfSlugs: ["battlestar-galactica"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2012-12-09",
  externalLink: "https://trakt.tv/movies/battlestar-galactica-blood-chrome-2012-12-09",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
