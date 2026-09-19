import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusEscape = {
  id: "01a0aa7c-2b8d-759e-8deb-459ef23b1a37",
  type: "page-type/track",
  slug: "zara-larsson-venus-escape",
  ownLength: 3.24545,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "10ky5LMbNGGXlHbfniwRmC",
      externalLink: "https://open.spotify.com/track/10ky5LMbNGGXlHbfniwRmC",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Escape",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "escape|1Xylc3o4UrD53lo9CvFvVg|194727",
  song: "song/zara-larsson-escape",
} as const satisfies Track
