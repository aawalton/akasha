import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsLoveOneAnother = {
  id: "01a0b4c8-22f9-7b21-9359-5b39742934ca",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-love-one-another",
  ownLength: 2.9833333333333334,
  ownProgress: 2.9833333333333334,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Love One Another",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "loveoneanother|7FQRbf8gbKw8KZQZAJWxH2|179000",
  song: "song/paul-cardall-love-one-another",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 17,
      externalId: "0OdKeYxyuesBpMnG99FdMg",
      externalLink: "https://open.spotify.com/track/0OdKeYxyuesBpMnG99FdMg",
    },
  ],
} as const satisfies Track
