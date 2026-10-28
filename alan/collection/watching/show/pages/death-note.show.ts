import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const deathNote = {
  id: "01a183d2-adb2-7273-9aa9-e19191c681d9",
  type: "page-type/show",
  slug: "death-note",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/death-note"],
  publishedAt: "2006-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13916",
      externalLink: "https://www.themoviedb.org/tv/13916",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Death Note",
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
  createdAt: "2026-10-28T18:43:04.751Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
