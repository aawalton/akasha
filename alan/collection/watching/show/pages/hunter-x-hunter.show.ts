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
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Crunchyroll",
    "Crunchyroll Amazon Channel",
    "Hulu",
    "Netflix",
    "Netflix Standard with Ads",
    "The Roku Channel",
    "Tubi TV",
  ],
  createdAt: "2026-10-28T18:43:40.765Z",
  updatedAt: "2026-10-28T19:44:38.758Z",
} as const satisfies Show
