import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3SaturnsReturn = {
  id: "01a0aa7c-2a16-7206-84b8-e01de140658a",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-saturns-return",
  ownLength: 3.79075,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-3"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4tHPWiQagyCevaz3j5n4iC",
      externalLink: "https://open.spotify.com/track/4tHPWiQagyCevaz3j5n4iC",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Saturn's Return",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "saturnsreturn|1Xylc3o4UrD53lo9CvFvVg|227445",
  song: "song/zara-larsson-saturn-s-return",
} as const satisfies Track
