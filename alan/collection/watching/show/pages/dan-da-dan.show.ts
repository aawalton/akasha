import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const danDaDan = {
  id: "01a183de-36c1-76e3-8548-cc51b631ead1",
  type: "page-type/show",
  slug: "dan-da-dan",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/dan-da-dan"],
  publishedAt: "2024-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "240411",
      externalLink: "https://www.themoviedb.org/tv/240411",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Dan Da Dan",
  streamingOn: [
    "streaming-service/adult-swim",
    "streaming-service/crunchyroll",
    "streaming-service/hulu",
    "streaming-service/netflix",
    "streaming-service/youtube-tv",
  ],
  createdAt: "2026-10-28T18:55:40.735Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
