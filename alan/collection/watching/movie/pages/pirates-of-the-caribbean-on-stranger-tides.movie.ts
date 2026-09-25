import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const piratesOfTheCaribbeanOnStrangerTides = {
  id: "01a06802-6d99-7029-935b-fc3f799fee07",
  type: "page-type/movie",
  slug: "pirates-of-the-caribbean-on-stranger-tides",
  title: "Pirates of the Caribbean: On Stranger Tides",
  partOfCollections: ["fandom/pirates-of-the-caribbean-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-05-20",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/pirates-of-the-caribbean-on-stranger-tides-2011",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
