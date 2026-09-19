import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonUncoverUncover = {
  id: "01a0aa7c-428f-782c-8920-e083ae613e2b",
  type: "page-type/track",
  slug: "zara-larsson-uncover-uncover",
  ownLength: 3.55905,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-uncover"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3DQisSEr1TLp9H0BEeKiQS",
      externalLink: "https://open.spotify.com/track/3DQisSEr1TLp9H0BEeKiQS",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Uncover",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "uncover|1Xylc3o4UrD53lo9CvFvVg|213543",
  song: "song/zara-larsson-uncover",
} as const satisfies Track
