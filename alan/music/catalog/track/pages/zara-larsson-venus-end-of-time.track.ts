import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusEndOfTime = {
  id: "01a0aa7c-2b44-7d42-adf7-af52172b07f2",
  type: "page-type/track",
  slug: "zara-larsson-venus-end-of-time",
  ownLength: 3.4967166666666665,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "42od6nOeV32g5uNwz17xq5",
      externalLink: "https://open.spotify.com/track/42od6nOeV32g5uNwz17xq5",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "End Of Time",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "endoftime|1Xylc3o4UrD53lo9CvFvVg|209803",
} as const satisfies Track
