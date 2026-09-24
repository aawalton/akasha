import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonHonorTheLightWinterSong = {
  id: "01a0aa7c-38c2-728a-967a-0495c87dcca9",
  type: "page-type/track",
  slug: "zara-larsson-honor-the-light-winter-song",
  ownLength: 3.084433333333333,
  ownProgress: 3.084433333333333,
  partOfCollections: ["release/zara-larsson-honor-the-light"],
  status: "completed",
  unit: "unit/minutes",
  title: "Winter Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "wintersong|1Xylc3o4UrD53lo9CvFvVg|185066",
  song: "song/zara-larsson-winter-song",
  carriedBy: [
    {
      release: "release/zara-larsson-honor-the-light",
      discNumber: 1,
      position: 2,
      externalId: "7b8X4P8McVS0RKAKhqtY1Y",
      externalLink: "https://open.spotify.com/track/7b8X4P8McVS0RKAKhqtY1Y",
    },
  ],
} as const satisfies Track
