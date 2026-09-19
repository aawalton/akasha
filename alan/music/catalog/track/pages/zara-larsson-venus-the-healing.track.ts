import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusTheHealing = {
  id: "01a0aa7c-2bf3-72ea-ba79-b6b0bf1446df",
  type: "page-type/track",
  slug: "zara-larsson-venus-the-healing",
  ownLength: 3.1827833333333335,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7pDWvRIbO3fDbLMpFjuEtP",
      externalLink: "https://open.spotify.com/track/7pDWvRIbO3fDbLMpFjuEtP",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Healing",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "thehealing|1Xylc3o4UrD53lo9CvFvVg|190967",
  song: "song/zara-larsson-the-healing",
} as const satisfies Track
