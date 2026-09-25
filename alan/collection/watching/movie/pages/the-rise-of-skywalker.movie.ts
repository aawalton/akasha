import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theRiseOfSkywalker = {
  id: "01a06802-6d9a-701d-b0d9-00363490c3a6",
  type: "page-type/movie",
  slug: "the-rise-of-skywalker",
  title: "The Rise of Skywalker",
  partOfCollections: ["fandom/star-wars-2"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-12-20",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-wars-the-rise-of-skywalker-2019",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
