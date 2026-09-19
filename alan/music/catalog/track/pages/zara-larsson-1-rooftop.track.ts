import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1Rooftop = {
  id: "01a0aa7c-3467-7e2c-a5b8-0c6a3b3c7f5a",
  type: "page-type/track",
  slug: "zara-larsson-1-rooftop",
  ownLength: 3.9896333333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3dxnBkhHVokELZtzNTgvjc",
      externalLink: "https://open.spotify.com/track/3dxnBkhHVokELZtzNTgvjc",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Rooftop",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "rooftop|1Xylc3o4UrD53lo9CvFvVg|239378",
  song: "song/zara-larsson-rooftop",
} as const satisfies Track
