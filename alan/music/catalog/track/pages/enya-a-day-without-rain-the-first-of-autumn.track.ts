import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaADayWithoutRainTheFirstOfAutumn = {
  id: "01a0a5b0-1683-7293-960f-449f26a1a82f",
  type: "track",
  slug: "enya-a-day-without-rain-the-first-of-autumn",
  ownLength: 3.1357666666666666,
  ownProgress: 0,
  partOfCollections: ["release/enya-a-day-without-rain"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ZFz7FQf2JRvsG51HyOgpj",
      externalLink: "https://open.spotify.com/track/4ZFz7FQf2JRvsG51HyOgpj",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The First of Autumn",
} as const satisfies Track
