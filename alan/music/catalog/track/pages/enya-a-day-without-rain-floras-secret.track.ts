import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaADayWithoutRainFlorasSecret = {
  id: "01a0a5b0-15d7-7401-9a63-ae87c04d7fa2",
  type: "page-type/track",
  slug: "enya-a-day-without-rain-floras-secret",
  ownLength: 4.1251,
  ownProgress: 0,
  partOfCollections: ["release/enya-a-day-without-rain"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4UW5yJcnRrOtHdKOnBds7M",
      externalLink: "https://open.spotify.com/track/4UW5yJcnRrOtHdKOnBds7M",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Flora's Secret",
} as const satisfies Track
