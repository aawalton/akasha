import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaADayWithoutRainOnlyTime = {
  id: "01a0a5b0-156f-79d8-9d4b-aaf6cbb6b592",
  type: "page-type/track",
  slug: "enya-a-day-without-rain-only-time",
  ownLength: 3.6424333333333334,
  ownProgress: 0,
  partOfCollections: ["release/enya-a-day-without-rain"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6FLwmdmW77N1Pxb1aWsZmO",
      externalLink: "https://open.spotify.com/track/6FLwmdmW77N1Pxb1aWsZmO",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Only Time",
} as const satisfies Track
