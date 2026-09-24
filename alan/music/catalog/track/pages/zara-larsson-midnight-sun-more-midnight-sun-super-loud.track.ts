import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunMoreMidnightSunSuperLoud = {
  id: "01a0aa7c-2706-73b2-90b1-1c71ca9c4bff",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-more-midnight-sun-super-loud",
  ownLength: 3.1788,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-more"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Midnight Sun - Super Loud",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "midnightsunsuperloud|1Xylc3o4UrD53lo9CvFvVg|190728",
  song: "song/zara-larsson-midnight-sun-super-loud",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-more",
      discNumber: 1,
      position: 6,
      externalId: "69psOP7O7y7QOV0dVisyNk",
      externalLink: "https://open.spotify.com/track/69psOP7O7y7QOV0dVisyNk",
    },
  ],
} as const satisfies Track
