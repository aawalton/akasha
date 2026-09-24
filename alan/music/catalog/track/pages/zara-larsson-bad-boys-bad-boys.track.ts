import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonBadBoysBadBoys = {
  id: "01a0aa7c-4211-76a5-86c3-74d9d9b2bf23",
  type: "page-type/track",
  slug: "zara-larsson-bad-boys-bad-boys",
  ownLength: 2.15355,
  ownProgress: 2.15355,
  partOfCollections: ["release/zara-larsson-bad-boys"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bad Boys",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "badboys|1Xylc3o4UrD53lo9CvFvVg|129213",
  song: "song/zara-larsson-bad-boys",
  carriedBy: [
    {
      release: "release/zara-larsson-bad-boys",
      discNumber: 1,
      position: 1,
      externalId: "67NSunZZnjNmwYibRwv9n5",
      externalLink: "https://open.spotify.com/track/67NSunZZnjNmwYibRwv9n5",
    },
  ],
} as const satisfies Track
