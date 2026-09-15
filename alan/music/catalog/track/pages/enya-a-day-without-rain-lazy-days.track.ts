import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaADayWithoutRainLazyDays = {
  id: "01a0a5b0-169f-73f2-9686-f8cef20e53d4",
  type: "track",
  slug: "enya-a-day-without-rain-lazy-days",
  ownLength: 3.71755,
  ownProgress: 0,
  partOfCollections: ["release/enya-a-day-without-rain"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "29K5Ku7NhBIDfDe4CDRXt6",
      externalLink: "https://open.spotify.com/track/29K5Ku7NhBIDfDe4CDRXt6",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Lazy Days",
} as const satisfies Track
