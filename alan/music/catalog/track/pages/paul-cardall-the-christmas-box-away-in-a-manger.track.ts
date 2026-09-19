import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxAwayInAManger = {
  id: "01a0b4c8-64dd-7b4e-9685-49a47c8cac43",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-away-in-a-manger",
  ownLength: 2.929333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2p7JLTdq3GWB146bKJKHRd",
      externalLink: "https://open.spotify.com/track/2p7JLTdq3GWB146bKJKHRd",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Away In A Manger",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "awayinamanger|7FQRbf8gbKw8KZQZAJWxH2|175760",
  song: "song/celtic-woman-away-in-a-manger",
} as const satisfies Track
