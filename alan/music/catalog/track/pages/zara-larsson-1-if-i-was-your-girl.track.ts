import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1IfIWasYourGirl = {
  id: "01a0aa7c-351a-76b3-9566-3f19515ba974",
  type: "page-type/track",
  slug: "zara-larsson-1-if-i-was-your-girl",
  ownLength: 2.6628,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-1"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6jHeMZkWtBd4Q8GCyZl8mx",
      externalLink: "https://open.spotify.com/track/6jHeMZkWtBd4Q8GCyZl8mx",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "If I Was Your Girl",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "ifiwasyourgirl|1Xylc3o4UrD53lo9CvFvVg|159768",
} as const satisfies Track
