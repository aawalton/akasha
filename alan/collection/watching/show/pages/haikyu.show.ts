import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const haikyu = {
  id: "01a183d2-cc4d-7040-8cd7-20db9c520fee",
  type: "page-type/show",
  slug: "haikyu",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/haikyu"],
  publishedAt: "2014-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "60863",
      externalLink: "https://www.themoviedb.org/tv/60863",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Haikyu!!",
  streamingOn: [
    "streaming-service/crunchyroll",
    "streaming-service/hulu",
    "streaming-service/netflix",
    "streaming-service/wetv",
  ],
  createdAt: "2026-10-28T18:43:12.581Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
