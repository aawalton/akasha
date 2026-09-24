import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3SaturnsReturn = {
  id: "01a0aa7c-2a16-7206-84b8-e01de140658a",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-saturns-return",
  ownLength: 3.79075,
  ownProgress: 3.79075,
  partOfCollections: [
    "release/zara-larsson-midnight-sun-3",
    "release/zara-larsson-midnight-sun-girls-trip",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Saturn's Return",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "saturnsreturn|1Xylc3o4UrD53lo9CvFvVg|227445",
  song: "song/zara-larsson-saturn-s-return",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-3",
      discNumber: 1,
      position: 9,
      externalId: "4tHPWiQagyCevaz3j5n4iC",
      externalLink: "https://open.spotify.com/track/4tHPWiQagyCevaz3j5n4iC",
    },
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 2,
      position: 9,
      externalId: "0MWVNM3TuMGPHXYzSndgnM",
      externalLink: "https://open.spotify.com/track/0MWVNM3TuMGPHXYzSndgnM",
    },
  ],
} as const satisfies Track
