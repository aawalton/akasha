import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeSunrise = {
  id: "01a0b9ee-ced8-789e-b578-a2d853e1d6f8",
  type: "page-type/track",
  slug: "coldplay-everyday-life-sunrise",
  ownLength: 2.5182166666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-everyday-life"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Tb7Zfo4PcSiS4TqQ4NnTh",
      externalLink: "https://open.spotify.com/track/6Tb7Zfo4PcSiS4TqQ4NnTh",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sunrise",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "sunrise|4gzpq5DPGxSnKTe4SA8HAU|151093",
  song: "song/coldplay-sunrise",
} as const satisfies Track
