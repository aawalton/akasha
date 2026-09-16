import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodNeverForgetYou = {
  id: "01a0aa7c-32f5-703e-905d-f0284c4fa6b3",
  type: "page-type/track",
  slug: "zara-larsson-so-good-never-forget-you",
  ownLength: 3.5429,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6hmhG1b4LEyNuashVvuIAo",
      externalLink: "https://open.spotify.com/track/6hmhG1b4LEyNuashVvuIAo",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Never Forget You",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "7uMh23xWiuR7zsNkuNcm2G", artistName: "MNEK" },
  ],
  trackKey: "neverforgetyou|1Xylc3o4UrD53lo9CvFvVg,7uMh23xWiuR7zsNkuNcm2G|212574",
} as const satisfies Track
