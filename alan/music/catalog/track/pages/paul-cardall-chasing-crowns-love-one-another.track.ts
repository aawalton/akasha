import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsLoveOneAnother = {
  id: "01a0b4c8-22f9-7b21-9359-5b39742934ca",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-love-one-another",
  ownLength: 2.9833333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0OdKeYxyuesBpMnG99FdMg",
      externalLink: "https://open.spotify.com/track/0OdKeYxyuesBpMnG99FdMg",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Love One Another",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "loveoneanother|7FQRbf8gbKw8KZQZAJWxH2|179000",
  song: "song/paul-cardall-love-one-another",
} as const satisfies Track
