import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyUniverseMyUniverseAcousticVersion = {
  id: "01a0b9ee-ee87-78e7-b1a5-e02ad65a3c11",
  type: "page-type/track",
  slug: "coldplay-my-universe-my-universe-acoustic-version",
  ownLength: 3.7211333333333334,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-my-universe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6nhc3daOpKaZBRj2ZFWfc7",
      externalLink: "https://open.spotify.com/track/6nhc3daOpKaZBRj2ZFWfc7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Universe - Acoustic Version",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "3Nrfpe0tUJi4K4DXYWgMUX", artistName: "BTS" },
  ],
  trackKey: "myuniverseacousticversion|3Nrfpe0tUJi4K4DXYWgMUX,4gzpq5DPGxSnKTe4SA8HAU|223268",
  song: "song/coldplay-my-universe",
} as const satisfies Track
