import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunMoreMidnightSunSlowedDown = {
  id: "01a0aa7c-26b5-75bc-9ea3-413f132d655e",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-more-midnight-sun-slowed-down",
  ownLength: 3.6171,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-more"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0cuh1fmmZtYnyseVgWBbl1",
      externalLink: "https://open.spotify.com/track/0cuh1fmmZtYnyseVgWBbl1",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun - Slowed Down",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "midnightsunsloweddown|1Xylc3o4UrD53lo9CvFvVg|217026",
  song: "song/zara-larsson-midnight-sun",
} as const satisfies Track
