import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonUncoverNeverGonnaDieAltVersion = {
  id: "01a0aa7c-4271-7339-a956-9fdfff58405a",
  type: "page-type/track",
  slug: "zara-larsson-uncover-never-gonna-die-alt-version",
  ownLength: 3.6742833333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-uncover"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2pnatOl6QfN4IndOnXTWnJ",
      externalLink: "https://open.spotify.com/track/2pnatOl6QfN4IndOnXTWnJ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Never Gonna Die - Alt Version",
  trackType: "version",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "nevergonnadiealtversion|1Xylc3o4UrD53lo9CvFvVg|220457",
  song: "song/zara-larsson-never-gonna-die",
} as const satisfies Track
