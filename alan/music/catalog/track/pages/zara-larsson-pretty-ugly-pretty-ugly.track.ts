import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPrettyUglyPrettyUgly = {
  id: "01a0aa7c-37e5-7ec1-87c7-13b250431cd4",
  type: "page-type/track",
  slug: "zara-larsson-pretty-ugly-pretty-ugly",
  ownLength: 2.6449333333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-pretty-ugly"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0lWcOHxfnxj1GlVr4zpnyD",
      externalLink: "https://open.spotify.com/track/0lWcOHxfnxj1GlVr4zpnyD",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Pretty Ugly",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "prettyugly|1Xylc3o4UrD53lo9CvFvVg|158696",
  song: "song/zara-larsson-pretty-ugly",
} as const satisfies Track
