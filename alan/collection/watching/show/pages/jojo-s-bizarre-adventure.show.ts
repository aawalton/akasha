import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const jojoSBizarreAdventure = {
  id: "01a183d4-4632-741d-9030-e5513c264081",
  type: "page-type/show",
  slug: "jojo-s-bizarre-adventure",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/jojo-s-bizarre-adventure"],
  publishedAt: "2012-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "45790",
      externalLink: "https://www.themoviedb.org/tv/45790",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "JoJo's Bizarre Adventure",
  streamingOn: [
    "streaming-service/amazon-mx-player",
    "streaming-service/amazon-prime-video",
    "streaming-service/amazon-prime-video-free-with-ads",
    "streaming-service/crunchyroll",
    "streaming-service/hulu",
    "streaming-service/netflix",
    "streaming-service/pluto-tv",
    "streaming-service/tubi",
  ],
  createdAt: "2026-10-28T18:44:49.318Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
