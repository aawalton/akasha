import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxDiamondsForStones = {
  id: "01a0b4c8-6577-7026-a0c0-d43be53ee984",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-diamonds-for-stones",
  ownLength: 2.7444333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0IAbbtoB2J9NcenjJc1hTS",
      externalLink: "https://open.spotify.com/track/0IAbbtoB2J9NcenjJc1hTS",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Diamonds For Stones",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "diamondsforstones|7FQRbf8gbKw8KZQZAJWxH2|164666",
  song: "song/paul-cardall-diamonds-for-stones",
} as const satisfies Track
