import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const vinlandSaga = {
  id: "01a183d4-e9fc-7e1a-8618-a802f8ee346a",
  type: "page-type/show",
  slug: "vinland-saga",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/vinland-saga"],
  publishedAt: "2019-07-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "88803",
      externalLink: "https://www.themoviedb.org/tv/88803",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Vinland Saga",
  streamingOn: [
    "streaming-service/amazon-prime-video",
    "streaming-service/crunchyroll",
    "streaming-service/hidive",
    "streaming-service/hulu",
    "streaming-service/netflix",
  ],
  createdAt: "2026-10-28T18:45:31.256Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
