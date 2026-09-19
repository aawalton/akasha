import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunMoreMidnightSunSuperLoud = {
  id: "01a0aa7c-2706-73b2-90b1-1c71ca9c4bff",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-more-midnight-sun-super-loud",
  ownLength: 3.1788,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-more"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "69psOP7O7y7QOV0dVisyNk",
      externalLink: "https://open.spotify.com/track/69psOP7O7y7QOV0dVisyNk",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun - Super Loud",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "midnightsunsuperloud|1Xylc3o4UrD53lo9CvFvVg|190728",
  song: "song/zara-larsson-midnight-sun-super-loud",
} as const satisfies Track
