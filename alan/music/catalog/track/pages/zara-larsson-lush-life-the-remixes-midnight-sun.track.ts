import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonLushLifeTheRemixesMidnightSun = {
  id: "01a0aa7c-2772-76b0-922f-f24dd3ef0be8",
  type: "page-type/track",
  slug: "zara-larsson-lush-life-the-remixes-midnight-sun",
  ownLength: 3.1649666666666665,
  ownProgress: 3.1649666666666665,
  partOfCollections: ["release/zara-larsson-lush-life-the-remixes"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ZM9VOj5cqNNb5nYTeNffY",
      externalLink: "https://open.spotify.com/track/2ZM9VOj5cqNNb5nYTeNffY",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "midnightsun|1Xylc3o4UrD53lo9CvFvVg|189898",
  song: "song/zara-larsson-midnight-sun",
  carriedBy: [
    {
      release: "release/zara-larsson-lush-life-the-remixes",
      discNumber: 1,
      position: 2,
      externalId: "2ZM9VOj5cqNNb5nYTeNffY",
      externalLink: "https://open.spotify.com/track/2ZM9VOj5cqNNb5nYTeNffY",
    },
  ],
} as const satisfies Track
