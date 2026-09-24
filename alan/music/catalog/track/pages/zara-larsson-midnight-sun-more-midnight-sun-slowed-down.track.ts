import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunMoreMidnightSunSlowedDown = {
  id: "01a0aa7c-26b5-75bc-9ea3-413f132d655e",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-more-midnight-sun-slowed-down",
  ownLength: 3.6171,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-more"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Midnight Sun - Slowed Down",
  trackType: "version",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "midnightsunsloweddown|1Xylc3o4UrD53lo9CvFvVg|217026",
  song: "song/zara-larsson-midnight-sun",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-more",
      discNumber: 1,
      position: 4,
      externalId: "0cuh1fmmZtYnyseVgWBbl1",
      externalLink: "https://open.spotify.com/track/0cuh1fmmZtYnyseVgWBbl1",
    },
  ],
} as const satisfies Track
