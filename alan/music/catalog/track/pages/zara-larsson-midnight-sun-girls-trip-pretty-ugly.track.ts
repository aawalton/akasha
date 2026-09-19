import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripPrettyUgly = {
  id: "01a0aa7c-21e2-7af0-9526-81887f27ac10",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-pretty-ugly",
  ownLength: 2.6449333333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-girls-trip"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3lzLpl0piLWLoLVBEjhk7H",
      externalLink: "https://open.spotify.com/track/3lzLpl0piLWLoLVBEjhk7H",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Pretty Ugly",
  trackType: "studio",
  discNumber: 2,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "prettyugly|1Xylc3o4UrD53lo9CvFvVg|158696",
  song: "song/zara-larsson-pretty-ugly",
} as const satisfies Track
