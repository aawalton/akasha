import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayHigherPowerAlyxAnderRemixHigherPower = {
  id: "01a0b9ee-efc5-77a4-b762-954c5cba34c6",
  type: "page-type/track",
  slug: "coldplay-higher-power-alyx-ander-remix-higher-power",
  ownLength: 3.5215666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-higher-power-alyx-ander-remix"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4tJJOIQVtzIG9i21VHu35z",
      externalLink: "https://open.spotify.com/track/4tJJOIQVtzIG9i21VHu35z",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Higher Power",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "higherpower|4gzpq5DPGxSnKTe4SA8HAU|211294",
  song: "song/coldplay-higher-power",
} as const satisfies Track
