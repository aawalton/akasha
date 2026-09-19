import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayHigherPowerAcousticVersionHigherPower = {
  id: "01a0b9ee-f00b-7090-a569-f0d53afd715b",
  type: "page-type/track",
  slug: "coldplay-higher-power-acoustic-version-higher-power",
  ownLength: 3.5215666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-higher-power-acoustic-version"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77jJZBmiozygu5IYfPun2B",
      externalLink: "https://open.spotify.com/track/77jJZBmiozygu5IYfPun2B",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Higher Power",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "higherpower|4gzpq5DPGxSnKTe4SA8HAU|211294",
} as const satisfies Track
