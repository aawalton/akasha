import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const naruto = {
  id: "01a183d1-bb62-7b2a-a147-0a75d7e20d64",
  type: "page-type/show",
  slug: "naruto",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/naruto"],
  publishedAt: "2002-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "46260",
      externalLink: "https://www.themoviedb.org/tv/46260",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Naruto",
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/crunchyroll",
    "streaming-service/fandango-at-home-free",
    "streaming-service/hulu",
    "streaming-service/netflix",
    "streaming-service/pluto-tv",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
