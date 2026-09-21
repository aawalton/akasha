import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayBiutyfulBiutyful = {
  id: "01a0b9ee-ec3b-70b2-bf70-84037fac4144",
  type: "page-type/track",
  slug: "coldplay-biutyful-biutyful",
  ownLength: 3.206566666666667,
  ownProgress: 3.206566666666667,
  partOfCollections: ["release/coldplay-biutyful", "release/coldplay-music-of-the-spheres"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4TcCbhzD4caTdkkvkS45oa",
      externalLink: "https://open.spotify.com/track/4TcCbhzD4caTdkkvkS45oa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Biutyful",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "biutyful|4gzpq5DPGxSnKTe4SA8HAU|192394",
  song: "song/coldplay-biutyful",
  carriedBy: [
    {
      release: "release/coldplay-biutyful",
      discNumber: 1,
      position: 1,
      externalId: "4TcCbhzD4caTdkkvkS45oa",
      externalLink: "https://open.spotify.com/track/4TcCbhzD4caTdkkvkS45oa",
    },
    {
      release: "release/coldplay-music-of-the-spheres",
      discNumber: 1,
      position: 8,
      externalId: "2L2mM3rEO3arNIMQnb3dou",
      externalLink: "https://open.spotify.com/track/2L2mM3rEO3arNIMQnb3dou",
    },
  ],
} as const satisfies Track
