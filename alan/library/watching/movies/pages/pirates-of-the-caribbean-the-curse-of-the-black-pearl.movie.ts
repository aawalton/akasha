import type { Movie } from "../movie.page-type.ts"

export const piratesOfTheCaribbeanTheCurseOfTheBlackPearl = {
  id: "01a06802-6d99-702a-8aef-6b8bd8c2b97b",
  pageTypeSlug: "movie",
  slug: "pirates-of-the-caribbean-the-curse-of-the-black-pearl",
  title: "Pirates of the Caribbean: The Curse of the Black Pearl",
  partOfSlugs: ["pirates-of-the-caribbean-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2003-07-09",
  externalLink:
    "https://trakt.tv/movies/pirates-of-the-caribbean-the-curse-of-the-black-pearl-2003",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
