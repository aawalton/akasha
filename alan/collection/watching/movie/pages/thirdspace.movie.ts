import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thirdspace = {
  id: "01a06802-6d9a-7022-b129-969fff370962",
  type: "page-type/movie",
  slug: "thirdspace",
  title: "Thirdspace",
  partOfCollections: ["fandom/babylon-5-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1998-07-19",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "babylon-5-thirdspace-1998",
      externalLink: "https://trakt.tv/movies/babylon-5-thirdspace-1998",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Movie
