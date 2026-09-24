import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxDiamondsForStones = {
  id: "01a0b4c8-6577-7026-a0c0-d43be53ee984",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-diamonds-for-stones",
  ownLength: 2.7444333333333333,
  ownProgress: 2.7444333333333333,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "Diamonds For Stones",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "diamondsforstones|7FQRbf8gbKw8KZQZAJWxH2|164666",
  song: "song/paul-cardall-diamonds-for-stones",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 7,
      externalId: "0IAbbtoB2J9NcenjJc1hTS",
      externalLink: "https://open.spotify.com/track/0IAbbtoB2J9NcenjJc1hTS",
    },
  ],
} as const satisfies Track
