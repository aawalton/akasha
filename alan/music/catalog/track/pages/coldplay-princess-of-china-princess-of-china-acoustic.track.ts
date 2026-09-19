import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayPrincessOfChinaPrincessOfChinaAcoustic = {
  id: "01a0b9ee-f8a6-73aa-9fc1-0785ac1f43b6",
  type: "page-type/track",
  slug: "coldplay-princess-of-china-princess-of-china-acoustic",
  ownLength: 3.4448833333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-princess-of-china"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2tKqZsc0epdLrsNUT6y0Ls",
      externalLink: "https://open.spotify.com/track/2tKqZsc0epdLrsNUT6y0Ls",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Princess of China - Acoustic",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "5pKCCKE2ajJHZ9KAiaK11H", artistName: "Rihanna" },
  ],
  trackKey: "princessofchinaacoustic|4gzpq5DPGxSnKTe4SA8HAU,5pKCCKE2ajJHZ9KAiaK11H|206693",
} as const satisfies Track
