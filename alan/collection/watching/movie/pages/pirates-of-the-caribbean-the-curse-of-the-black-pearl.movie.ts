import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const piratesOfTheCaribbeanTheCurseOfTheBlackPearl = {
  id: "01a06802-6d99-702a-8aef-6b8bd8c2b97b",
  type: "page-type/movie",
  slug: "pirates-of-the-caribbean-the-curse-of-the-black-pearl",
  title: "Pirates of the Caribbean: The Curse of the Black Pearl",
  partOfCollections: ["fandom/pirates-of-the-caribbean-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2003-07-09",
  externalIdentity: [
    {
      source: "trakt",
      externalLink:
        "https://trakt.tv/movies/pirates-of-the-caribbean-the-curse-of-the-black-pearl-2003",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
