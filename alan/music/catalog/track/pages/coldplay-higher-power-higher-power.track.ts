import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayHigherPowerHigherPower = {
  id: "01a0b9ee-f07c-7f5f-b611-71374ccbe94f",
  type: "page-type/track",
  slug: "coldplay-higher-power-higher-power",
  ownLength: 3.5215666666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-higher-power"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0939D7aT18uBDS2MTjWzct",
      externalLink: "https://open.spotify.com/track/0939D7aT18uBDS2MTjWzct",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Higher Power",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "higherpower|4gzpq5DPGxSnKTe4SA8HAU|211294",
  song: "song/coldplay-higher-power",
} as const satisfies Track
