import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fateStayNightHeavenSFeelIiLostButterfly = {
  id: "01a183d9-5bba-7eb0-97f1-b86bd827e89f",
  type: "page-type/movie",
  slug: "fate-stay-night-heaven-s-feel-ii-lost-butterfly",
  ownLength: 117,
  ownProgress: 0,
  partOfCollections: ["fandom/fate"],
  publishedAt: "2019-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "390634",
      externalLink: "https://www.themoviedb.org/movie/390634",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Fate/stay night: Heaven's Feel II. Lost Butterfly",
  streamingOn: ["streaming-service/crunchyroll", "streaming-service/hulu"],
  createdAt: "2026-10-28T18:50:22.522Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
