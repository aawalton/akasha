import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterMansBestFriendBonusTrackVersionHouseTour = {
  id: "01a0b111-1a01-7962-a742-8caa786f6b49",
  type: "page-type/track",
  slug: "sabrina-carpenter-mans-best-friend-bonus-track-version-house-tour",
  ownLength: 2.8202333333333334,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-mans-best-friend-bonus-track-version"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "01oKQDSb3WHN5NeMNCo4uM",
      externalLink: "https://open.spotify.com/track/01oKQDSb3WHN5NeMNCo4uM",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "House Tour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "housetour|74KM79TiuVKeVCqs8QtB0B|169214",
  song: "song/sabrina-carpenter-house-tour",
} as const satisfies Track
