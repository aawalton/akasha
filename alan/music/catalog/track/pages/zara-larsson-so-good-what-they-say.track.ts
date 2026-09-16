import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodWhatTheySay = {
  id: "01a0aa7c-3217-7a7c-984f-f6ab72d56f98",
  type: "page-type/track",
  slug: "zara-larsson-so-good-what-they-say",
  ownLength: 3.6492166666666668,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1TOiDnIY8HgPyDLSR08QXq",
      externalLink: "https://open.spotify.com/track/1TOiDnIY8HgPyDLSR08QXq",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "What They Say",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "whattheysay|1Xylc3o4UrD53lo9CvFvVg|218953",
} as const satisfies Track
