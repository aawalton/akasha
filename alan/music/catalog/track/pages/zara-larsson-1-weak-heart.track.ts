import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1WeakHeart = {
  id: "01a0aa7c-34f4-7cd6-9814-bdf0a9af38f4",
  type: "page-type/track",
  slug: "zara-larsson-1-weak-heart",
  ownLength: 2.9989666666666666,
  ownProgress: 2.9989666666666666,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Weak Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "weakheart|1Xylc3o4UrD53lo9CvFvVg|179938",
  song: "song/zara-larsson-weak-heart",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 7,
      externalId: "4gmO89eAVOQeudq2EVhqyq",
      externalLink: "https://open.spotify.com/track/4gmO89eAVOQeudq2EVhqyq",
    },
  ],
} as const satisfies Track
