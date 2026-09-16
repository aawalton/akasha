import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1NeverGonnaDie = {
  id: "01a0aa7c-3488-7baf-8be0-cbc5a1d27b88",
  type: "page-type/track",
  slug: "zara-larsson-1-never-gonna-die",
  ownLength: 3.7713666666666668,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2iAsEQ50dfeAm5BRuSYdjR",
      externalLink: "https://open.spotify.com/track/2iAsEQ50dfeAm5BRuSYdjR",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Never Gonna Die",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "nevergonnadie|1Xylc3o4UrD53lo9CvFvVg|226282",
} as const satisfies Track
