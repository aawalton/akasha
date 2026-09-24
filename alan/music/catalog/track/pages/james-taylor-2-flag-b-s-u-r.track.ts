import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagBSUR = {
  id: "01a0abeb-4527-7104-b2d2-780c2c8e952f",
  type: "page-type/track",
  slug: "james-taylor-2-flag-b-s-u-r",
  ownLength: 3.354,
  ownProgress: 3.354,
  partOfCollections: ["release/james-taylor-2-flag"],
  status: "completed",
  unit: "unit/minutes",
  title: "B.S.U.R.",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "bsur|0vn7UBvSQECKJm2817Yf1P|201240",
  song: "song/james-taylor-b-s-u-r",
  carriedBy: [
    {
      release: "release/james-taylor-2-flag",
      discNumber: 1,
      position: 7,
      externalId: "3u4V4Qj0564NIr48nYcpdj",
      externalLink: "https://open.spotify.com/track/3u4V4Qj0564NIr48nYcpdj",
    },
  ],
} as const satisfies Track
