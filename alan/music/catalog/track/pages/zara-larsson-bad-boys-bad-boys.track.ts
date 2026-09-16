import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonBadBoysBadBoys = {
  id: "01a0aa7c-4211-76a5-86c3-74d9d9b2bf23",
  type: "page-type/track",
  slug: "zara-larsson-bad-boys-bad-boys",
  ownLength: 2.15355,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-bad-boys"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "67NSunZZnjNmwYibRwv9n5",
      externalLink: "https://open.spotify.com/track/67NSunZZnjNmwYibRwv9n5",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Bad Boys",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "badboys|1Xylc3o4UrD53lo9CvFvVg|129213",
} as const satisfies Track
