import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const fateStayNightUnlimitedBladeWorks = {
  id: "01a183d9-4c4b-7f56-b5c0-46f2d4bc9df0",
  type: "page-type/show",
  slug: "fate-stay-night-unlimited-blade-works",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/fate"],
  publishedAt: "2014-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "61415",
      externalLink: "https://www.themoviedb.org/tv/61415",
      lastSyncedAt: "2026-10-28",
    },
  ],
  title: "Fate/stay night [Unlimited Blade Works]",
  streamingOn: [
    "streaming-service/crunchyroll",
    "streaming-service/hidive",
    "streaming-service/hulu",
  ],
  createdAt: "2026-10-28T18:50:18.568Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Show
