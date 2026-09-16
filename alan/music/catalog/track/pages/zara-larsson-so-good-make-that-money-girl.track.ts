import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodMakeThatMoneyGirl = {
  id: "01a0aa7c-3356-7de0-ba3c-789ab266deb2",
  type: "page-type/track",
  slug: "zara-larsson-so-good-make-that-money-girl",
  ownLength: 3.314783333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1DJY8zj0Cbglv1kMjDivke",
      externalLink: "https://open.spotify.com/track/1DJY8zj0Cbglv1kMjDivke",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Make That Money Girl",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "makethatmoneygirl|1Xylc3o4UrD53lo9CvFvVg|198887",
} as const satisfies Track
