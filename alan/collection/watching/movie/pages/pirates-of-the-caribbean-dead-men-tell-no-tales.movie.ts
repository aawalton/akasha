import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const piratesOfTheCaribbeanDeadMenTellNoTales = {
  id: "01a06802-6d99-7028-b9e3-0dcb3405dfa4",
  type: "page-type/movie",
  slug: "pirates-of-the-caribbean-dead-men-tell-no-tales",
  title: "Pirates of the Caribbean: Dead Men Tell No Tales",
  partOfCollections: ["fandom/pirates-of-the-caribbean-2"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-05-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/pirates-of-the-caribbean-dead-men-tell-no-tales-2017",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
