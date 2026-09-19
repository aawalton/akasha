import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresBiutyful = {
  id: "01a0b9ee-ce11-70a4-8fef-d372938ca7f0",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-biutyful",
  ownLength: 3.206566666666667,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2L2mM3rEO3arNIMQnb3dou",
      externalLink: "https://open.spotify.com/track/2L2mM3rEO3arNIMQnb3dou",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Biutyful",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "biutyful|4gzpq5DPGxSnKTe4SA8HAU|192394",
  song: "song/coldplay-biutyful",
} as const satisfies Track
