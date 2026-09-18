import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleIKnowItHurts = {
  id: "01a0b4c8-2f5f-7226-9dd9-3613509bf7e3",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-i-know-it-hurts",
  ownLength: 3.6986666666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Lb9AmT71mBtCnrLC21BGx",
      externalLink: "https://open.spotify.com/track/3Lb9AmT71mBtCnrLC21BGx",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I Know It Hurts",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
    { externalId: "5XCujjq919BFXTnjyyDpiE", artistName: "Tyler Glenn" },
  ],
  trackKey: "iknowithurts|5XCujjq919BFXTnjyyDpiE,7FQRbf8gbKw8KZQZAJWxH2|221920",
} as const satisfies Track
