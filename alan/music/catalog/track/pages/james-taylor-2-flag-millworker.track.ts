import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagMillworker = {
  id: "01a0abeb-4560-765e-8499-670b69e5d252",
  type: "page-type/track",
  slug: "james-taylor-2-flag-millworker",
  ownLength: 3.862216666666667,
  ownProgress: 3.862216666666667,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 9,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "58Pz2cGXmjnmaN0FZEt0qB",
      externalLink: "https://open.spotify.com/track/58Pz2cGXmjnmaN0FZEt0qB",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Millworker",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "millworker|0vn7UBvSQECKJm2817Yf1P|231733",
  song: "song/james-taylor-millworker",
  carriedBy: [
    {
      release: "release/james-taylor-2-flag",
      discNumber: 1,
      position: 9,
      externalId: "58Pz2cGXmjnmaN0FZEt0qB",
      externalLink: "https://open.spotify.com/track/58Pz2cGXmjnmaN0FZEt0qB",
    },
  ],
} as const satisfies Track
