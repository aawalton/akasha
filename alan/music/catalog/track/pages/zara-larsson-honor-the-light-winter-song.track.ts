import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonHonorTheLightWinterSong = {
  id: "01a0aa7c-38c2-728a-967a-0495c87dcca9",
  type: "page-type/track",
  slug: "zara-larsson-honor-the-light-winter-song",
  ownLength: 3.084433333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-honor-the-light"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7b8X4P8McVS0RKAKhqtY1Y",
      externalLink: "https://open.spotify.com/track/7b8X4P8McVS0RKAKhqtY1Y",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Winter Song",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "wintersong|1Xylc3o4UrD53lo9CvFvVg|185066",
  song: "song/zara-larsson-winter-song",
} as const satisfies Track
