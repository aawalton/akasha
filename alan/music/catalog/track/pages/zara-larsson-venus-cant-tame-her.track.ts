import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusCantTameHer = {
  id: "01a0aa7c-2a60-770c-874a-bdf63645f48e",
  type: "page-type/track",
  slug: "zara-larsson-venus-cant-tame-her",
  ownLength: 3.2823166666666665,
  ownProgress: 3.2823166666666665,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1G1kKHczSz6Xqv5dCmtkL4",
      externalLink: "https://open.spotify.com/track/1G1kKHczSz6Xqv5dCmtkL4",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Can't Tame Her",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "canttameher|1Xylc3o4UrD53lo9CvFvVg|196939",
  song: "song/zara-larsson-can-t-tame-her",
  carriedBy: [
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 1,
      externalId: "1G1kKHczSz6Xqv5dCmtkL4",
      externalLink: "https://open.spotify.com/track/1G1kKHczSz6Xqv5dCmtkL4",
    },
  ],
} as const satisfies Track
