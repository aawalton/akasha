import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1Uncover = {
  id: "01a0aa7c-35b4-7787-8ad4-c1a21ed813e8",
  type: "page-type/track",
  slug: "zara-larsson-1-uncover",
  ownLength: 3.5763833333333332,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1aAR4ew6wViXZJofgVo94M",
      externalLink: "https://open.spotify.com/track/1aAR4ew6wViXZJofgVo94M",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Uncover",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "uncover|1Xylc3o4UrD53lo9CvFvVg|214583",
  song: "song/zara-larsson-uncover",
} as const satisfies Track
