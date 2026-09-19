import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripSaturnsReturn = {
  id: "01a0aa7c-22a8-7124-a85a-253889dd288d",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-saturns-return",
  ownLength: 3.79075,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-girls-trip"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0MWVNM3TuMGPHXYzSndgnM",
      externalLink: "https://open.spotify.com/track/0MWVNM3TuMGPHXYzSndgnM",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Saturn's Return",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "saturnsreturn|1Xylc3o4UrD53lo9CvFvVg|227445",
  song: "song/zara-larsson-saturn-s-return",
} as const satisfies Track
