import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonCrushCrush = {
  id: "01a0aa7c-36ba-781d-b4f9-109d6a94c57a",
  type: "page-type/track",
  slug: "zara-larsson-crush-crush",
  ownLength: 2.951966666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-crush"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "79bteG47Ms3rUa9TTxhTzF",
      externalLink: "https://open.spotify.com/track/79bteG47Ms3rUa9TTxhTzF",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Crush",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "crush|1Xylc3o4UrD53lo9CvFvVg|177118",
} as const satisfies Track
