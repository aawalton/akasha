import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyUniverseMyUniverseAcousticVersion = {
  id: "01a0b9ee-ee87-78e7-b1a5-e02ad65a3c11",
  type: "page-type/track",
  slug: "coldplay-my-universe-my-universe-acoustic-version",
  ownLength: 3.7211333333333334,
  ownProgress: 3.7211333333333334,
  partOfCollections: ["release/coldplay-my-universe"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Universe - Acoustic Version",
  trackType: "acoustic",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "BTS" }],
  trackKey: "myuniverseacousticversion|3Nrfpe0tUJi4K4DXYWgMUX,4gzpq5DPGxSnKTe4SA8HAU|223268",
  song: "song/coldplay-my-universe",
  carriedBy: [
    {
      release: "release/coldplay-my-universe",
      discNumber: 1,
      position: 1,
      externalId: "6nhc3daOpKaZBRj2ZFWfc7",
      externalLink: "https://open.spotify.com/track/6nhc3daOpKaZBRj2ZFWfc7",
    },
  ],
} as const satisfies Track
