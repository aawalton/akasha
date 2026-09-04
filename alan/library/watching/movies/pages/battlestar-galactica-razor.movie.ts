import type { Movie } from "../movie.page-type.ts"

export const battlestarGalacticaRazor = {
  id: "01a06802-6d98-7013-9f31-69c9f37c1c10",
  pageTypeSlug: "movie",
  slug: "battlestar-galactica-razor",
  title: "Battlestar Galactica: Razor",
  partOfSlugs: ["battlestar-galactica"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2007-11-12",
  externalLink: "https://trakt.tv/movies/battlestar-galactica-razor-2007",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
