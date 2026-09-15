import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaADayWithoutRainWildChild = {
  id: "01a0a5b0-154d-74f6-b839-2b03aebee282",
  type: "page-type/track",
  slug: "enya-a-day-without-rain-wild-child",
  ownLength: 3.79155,
  ownProgress: 0,
  partOfCollections: ["release/enya-a-day-without-rain"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4MJ4El9vcKHOQT2RNIhrh2",
      externalLink: "https://open.spotify.com/track/4MJ4El9vcKHOQT2RNIhrh2",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Wild Child",
} as const satisfies Track
