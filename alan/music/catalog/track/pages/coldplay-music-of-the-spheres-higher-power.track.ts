import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresHigherPower = {
  id: "01a0b9ee-cd27-7aac-9dc2-8d5ae77806c2",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-higher-power",
  ownLength: 3.4446833333333333,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "65OR4ywy8Cgs3FDHK82Idl",
      externalLink: "https://open.spotify.com/track/65OR4ywy8Cgs3FDHK82Idl",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Higher Power",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "higherpower|4gzpq5DPGxSnKTe4SA8HAU|206681",
  song: "song/coldplay-higher-power",
} as const satisfies Track
