import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleIKnowItHurts = {
  id: "01a0b4c8-2f5f-7226-9dd9-3613509bf7e3",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-i-know-it-hurts",
  ownLength: 3.6986666666666665,
  ownProgress: 3.6986666666666665,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Know It Hurts",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }, { artistName: "Tyler Glenn" }],
  trackKey: "iknowithurts|5XCujjq919BFXTnjyyDpiE,7FQRbf8gbKw8KZQZAJWxH2|221920",
  song: "song/paul-cardall-i-know-it-hurts",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 6,
      externalId: "3Lb9AmT71mBtCnrLC21BGx",
      externalLink: "https://open.spotify.com/track/3Lb9AmT71mBtCnrLC21BGx",
    },
  ],
} as const satisfies Track
