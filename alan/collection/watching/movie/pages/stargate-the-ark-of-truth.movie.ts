import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const stargateTheArkOfTruth = {
  id: "01a06802-6d9a-7002-a600-9f55cf5ac006",
  type: "page-type/movie",
  slug: "stargate-the-ark-of-truth",
  title: "Stargate: The Ark of Truth",
  partOfCollections: ["fandom/stargate-2"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-03-11",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/stargate-the-ark-of-truth-2008",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
