import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3HotSexy = {
  id: "01a0aa7c-29cd-70e7-b589-0fd938620f30",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-hot-sexy",
  ownLength: 3.15585,
  ownProgress: 3.15585,
  partOfCollections: [
    "release/zara-larsson-midnight-sun-3",
    "release/zara-larsson-midnight-sun-girls-trip",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Hot & Sexy",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "hotsexy|1Xylc3o4UrD53lo9CvFvVg|189351",
  song: "song/zara-larsson-hot-sexy",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-3",
      discNumber: 1,
      position: 7,
      externalId: "6XcyAXAYKQD7FqCG2F2xOu",
      externalLink: "https://open.spotify.com/track/6XcyAXAYKQD7FqCG2F2xOu",
    },
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 2,
      position: 7,
      externalId: "22nIz4Kxhuc53AG6ZMJxOB",
      externalLink: "https://open.spotify.com/track/22nIz4Kxhuc53AG6ZMJxOB",
    },
  ],
} as const satisfies Track
