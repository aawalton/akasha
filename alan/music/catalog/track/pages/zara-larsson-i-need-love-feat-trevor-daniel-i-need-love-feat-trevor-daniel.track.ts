import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonINeedLoveFeatTrevorDanielINeedLoveFeatTrevorDaniel = {
  id: "01a0aa7c-3ca8-74c9-b179-d101a7658a26",
  type: "page-type/track",
  slug: "zara-larsson-i-need-love-feat-trevor-daniel-i-need-love-feat-trevor-daniel",
  ownLength: 3.1068,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-i-need-love-feat-trevor-daniel"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ZDcSX1KLQU5MAHWItlc8Z",
      externalLink: "https://open.spotify.com/track/1ZDcSX1KLQU5MAHWItlc8Z",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I Need Love (feat. Trevor Daniel)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "7uaIm6Pw7xplS8Dy06V6pT", artistName: "Trevor Daniel" },
  ],
  trackKey: "ineedlovefeattrevordaniel|1Xylc3o4UrD53lo9CvFvVg,7uaIm6Pw7xplS8Dy06V6pT|186408",
  song: "song/zara-larsson-i-need-love",
} as const satisfies Track
