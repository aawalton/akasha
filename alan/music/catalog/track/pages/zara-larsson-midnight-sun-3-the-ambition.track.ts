import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3TheAmbition = {
  id: "01a0aa7c-29f0-7a71-92eb-b762ddde55a2",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-the-ambition",
  ownLength: 3.5784166666666666,
  ownProgress: 3.5784166666666666,
  partOfCollections: [
    "release/zara-larsson-midnight-sun-3",
    "release/zara-larsson-midnight-sun-girls-trip",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Ambition",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "theambition|1Xylc3o4UrD53lo9CvFvVg|214705",
  song: "song/zara-larsson-the-ambition",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-3",
      discNumber: 1,
      position: 8,
      externalId: "0kfVayo9KsW0VWT5Z9Twcw",
      externalLink: "https://open.spotify.com/track/0kfVayo9KsW0VWT5Z9Twcw",
    },
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 2,
      position: 8,
      externalId: "3KzE1qTzvwXM3WO1NQX5VN",
      externalLink: "https://open.spotify.com/track/3KzE1qTzvwXM3WO1NQX5VN",
    },
  ],
} as const satisfies Track
