import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusVenus = {
  id: "01a0aa7c-2bd0-70f3-86f0-d5a05ac6cc75",
  type: "page-type/track",
  slug: "zara-larsson-venus-venus",
  ownLength: 3.460183333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1RaVANIegur4WaZTscvVS4",
      externalLink: "https://open.spotify.com/track/1RaVANIegur4WaZTscvVS4",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Venus",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "venus|1Xylc3o4UrD53lo9CvFvVg|207611",
  song: "song/zara-larsson-venus",
} as const satisfies Track
