import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const hunterXHunter = {
  id: "01a183d3-3a68-70de-a983-aca53cdd69e7",
  type: "page-type/show",
  slug: "hunter-x-hunter",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/hunter-x-hunter"],
  publishedAt: "2011-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "46298",
      externalLink: "https://www.themoviedb.org/tv/46298",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Hunter x Hunter",
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/crunchyroll",
    "streaming-service/hulu",
    "streaming-service/netflix",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-28T18:43:40.765Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
