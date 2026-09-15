import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaADayWithoutRainPilgrim = {
  id: "01a0a5b0-163e-727c-b542-77af985eea73",
  type: "track",
  slug: "enya-a-day-without-rain-pilgrim",
  ownLength: 3.21155,
  ownProgress: 0,
  partOfCollections: ["release/enya-a-day-without-rain"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1wVQzI9QHQHZ9hNXwpY5GZ",
      externalLink: "https://open.spotify.com/track/1wVQzI9QHQHZ9hNXwpY5GZ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Pilgrim",
} as const satisfies Track
