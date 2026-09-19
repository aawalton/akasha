import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1WeakHeart = {
  id: "01a0aa7c-34f4-7cd6-9814-bdf0a9af38f4",
  type: "page-type/track",
  slug: "zara-larsson-1-weak-heart",
  ownLength: 2.9989666666666666,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4gmO89eAVOQeudq2EVhqyq",
      externalLink: "https://open.spotify.com/track/4gmO89eAVOQeudq2EVhqyq",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Weak Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "weakheart|1Xylc3o4UrD53lo9CvFvVg|179938",
  song: "song/zara-larsson-weak-heart",
} as const satisfies Track
