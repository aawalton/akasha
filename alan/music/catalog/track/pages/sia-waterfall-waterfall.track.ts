import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWaterfallWaterfall = {
  id: "01a0a59c-354d-746b-8857-89dd776e235c",
  type: "page-type/track",
  slug: "sia-waterfall-waterfall",
  ownLength: 3.333816666666667,
  ownProgress: 0,
  partOfCollections: ["release/sia-waterfall"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7pYFPMeK0TnaTGdS6qOtEr",
      externalLink: "https://open.spotify.com/track/7pYFPMeK0TnaTGdS6qOtEr",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Waterfall",
} as const satisfies Track
