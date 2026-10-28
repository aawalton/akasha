import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const jujutsuKaisen0 = {
  id: "01a183d3-5aa8-7ce0-99d9-d1dcdcf470d1",
  type: "page-type/movie",
  slug: "jujutsu-kaisen-0",
  ownLength: 105,
  ownProgress: 0,
  partOfCollections: ["fandom/jujutsu-kaisen"],
  publishedAt: "2021-12-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "810693",
      externalLink: "https://www.themoviedb.org/movie/810693",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Jujutsu Kaisen 0",
  streamingOn: [
    "streaming-service/amazon-prime-video",
    "streaming-service/crunchyroll",
    "streaming-service/hulu",
    "streaming-service/netflix",
  ],
  createdAt: "2026-10-28T18:43:49.032Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
