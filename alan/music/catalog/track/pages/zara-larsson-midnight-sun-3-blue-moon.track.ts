import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3BlueMoon = {
  id: "01a0aa7c-290d-7c7a-9ea2-124e758225a2",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-blue-moon",
  ownLength: 3.03425,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-3"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "20R5YwjmKubeva79prlvJq",
      externalLink: "https://open.spotify.com/track/20R5YwjmKubeva79prlvJq",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Blue Moon",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "bluemoon|1Xylc3o4UrD53lo9CvFvVg|182055",
  song: "song/zara-larsson-blue-moon",
} as const satisfies Track
