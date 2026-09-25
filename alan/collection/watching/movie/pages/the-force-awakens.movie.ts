import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theForceAwakens = {
  id: "01a06802-6d9a-700c-ad8c-b836092ac513",
  type: "page-type/movie",
  slug: "the-force-awakens",
  title: "The Force Awakens",
  partOfCollections: ["fandom/star-wars-2"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-12-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-wars-the-force-awakens-2015",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
