import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagMillworker = {
  id: "01a0abeb-4560-765e-8499-670b69e5d252",
  type: "page-type/track",
  slug: "james-taylor-2-flag-millworker",
  ownLength: 3.862216666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 9,
  status: "not-started",
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
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "millworker|0vn7UBvSQECKJm2817Yf1P|231733",
} as const satisfies Track
