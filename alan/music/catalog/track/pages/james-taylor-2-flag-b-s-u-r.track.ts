import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagBSUR = {
  id: "01a0abeb-4527-7104-b2d2-780c2c8e952f",
  type: "page-type/track",
  slug: "james-taylor-2-flag-b-s-u-r",
  ownLength: 3.354,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3u4V4Qj0564NIr48nYcpdj",
      externalLink: "https://open.spotify.com/track/3u4V4Qj0564NIr48nYcpdj",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "B.S.U.R.",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "bsur|0vn7UBvSQECKJm2817Yf1P|201240",
} as const satisfies Track
