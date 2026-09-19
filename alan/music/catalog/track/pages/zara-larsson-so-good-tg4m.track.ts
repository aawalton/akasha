import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodTg4m = {
  id: "01a0aa7c-32b3-7cad-9f87-8cb4394a65e0",
  type: "page-type/track",
  slug: "zara-larsson-so-good-tg4m",
  ownLength: 2.8816,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4uoumbAMEMaKdtiv763jKz",
      externalLink: "https://open.spotify.com/track/4uoumbAMEMaKdtiv763jKz",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "TG4M",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "tg4m|1Xylc3o4UrD53lo9CvFvVg|172896",
  song: "song/zara-larsson-tg4m",
} as const satisfies Track
