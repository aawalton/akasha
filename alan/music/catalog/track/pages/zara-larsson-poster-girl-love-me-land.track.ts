import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlLoveMeLand = {
  id: "01a0aa7c-301e-786a-b4f8-4c994a2b60fd",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-love-me-land",
  ownLength: 2.6719333333333335,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1dKmaDRG1KvqwANvlhIyqx",
      externalLink: "https://open.spotify.com/track/1dKmaDRG1KvqwANvlhIyqx",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Love Me Land",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "lovemeland|1Xylc3o4UrD53lo9CvFvVg|160316",
  song: "song/zara-larsson-love-me-land",
} as const satisfies Track
