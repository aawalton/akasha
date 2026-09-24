import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonAllTheTimeAllTheTime = {
  id: "01a0aa7c-3e08-7620-a35d-8009c40110b1",
  type: "page-type/track",
  slug: "zara-larsson-all-the-time-all-the-time",
  ownLength: 3.8018666666666667,
  ownProgress: 3.8018666666666667,
  partOfCollections: ["release/zara-larsson-all-the-time"],
  status: "completed",
  unit: "unit/minutes",
  title: "All the Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "allthetime|1Xylc3o4UrD53lo9CvFvVg|228112",
  song: "song/zara-larsson-all-the-time",
  carriedBy: [
    {
      release: "release/zara-larsson-all-the-time",
      discNumber: 1,
      position: 1,
      externalId: "3OTSBoYKO7HzGVj8Bu2OH9",
      externalLink: "https://open.spotify.com/track/3OTSBoYKO7HzGVj8Bu2OH9",
    },
  ],
} as const satisfies Track
