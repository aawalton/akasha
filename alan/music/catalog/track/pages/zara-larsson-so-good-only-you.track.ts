import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodOnlyYou = {
  id: "01a0aa7c-32d4-7ce5-bc18-97ba7c102811",
  type: "page-type/track",
  slug: "zara-larsson-so-good-only-you",
  ownLength: 3.7060333333333335,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5SleX0NFeODNY7Xenal3gr",
      externalLink: "https://open.spotify.com/track/5SleX0NFeODNY7Xenal3gr",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Only You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "onlyyou|1Xylc3o4UrD53lo9CvFvVg|222362",
} as const satisfies Track
