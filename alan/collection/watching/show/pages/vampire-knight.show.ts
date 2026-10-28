import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const vampireKnight = {
  id: "01a183d8-f259-74d3-9c7e-71737871dd32",
  type: "page-type/show",
  slug: "vampire-knight",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/vampire-knight"],
  publishedAt: "2008-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "17149",
      externalLink: "https://www.themoviedb.org/tv/17149",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Vampire Knight",
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/crunchyroll",
    "streaming-service/fandango-at-home-free",
    "streaming-service/hulu",
    "streaming-service/netflix",
    "streaming-service/retrocrush",
    "streaming-service/the-roku-channel",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
