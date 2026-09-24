import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxAwayInAManger = {
  id: "01a0b4c8-64dd-7b4e-9685-49a47c8cac43",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-away-in-a-manger",
  ownLength: 2.929333333333333,
  ownProgress: 2.929333333333333,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  status: "completed",
  unit: "unit/minutes",
  title: "Away In A Manger",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "awayinamanger|7FQRbf8gbKw8KZQZAJWxH2|175760",
  song: "song/celtic-woman-away-in-a-manger",
  carriedBy: [
    {
      release: "release/paul-cardall-the-christmas-box",
      discNumber: 1,
      position: 3,
      externalId: "2p7JLTdq3GWB146bKJKHRd",
      externalLink: "https://open.spotify.com/track/2p7JLTdq3GWB146bKJKHRd",
    },
  ],
} as const satisfies Track
