import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JtYourSmilingFace = {
  id: "01a0abeb-45d5-732e-8dce-ea0e043da537",
  type: "page-type/track",
  slug: "james-taylor-2-jt-your-smiling-face",
  ownLength: 2.7856833333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-jt"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Q34tAtTWI6RdW1qzFQiPb",
      externalLink: "https://open.spotify.com/track/1Q34tAtTWI6RdW1qzFQiPb",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Your Smiling Face",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "yoursmilingface|0vn7UBvSQECKJm2817Yf1P|167141",
  song: "song/james-taylor-your-smiling-face",
} as const satisfies Track
