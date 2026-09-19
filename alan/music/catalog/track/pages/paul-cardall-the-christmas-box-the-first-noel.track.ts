import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxTheFirstNoel = {
  id: "01a0b4c8-65c5-7d1f-beee-4a1621a2d3ec",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-the-first-noel",
  ownLength: 2.7462166666666668,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0W6BmzhYSDQdMkYKuxR3yN",
      externalLink: "https://open.spotify.com/track/0W6BmzhYSDQdMkYKuxR3yN",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The First Noel",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thefirstnoel|7FQRbf8gbKw8KZQZAJWxH2|164773",
  song: "song/paul-cardall-the-first-noel",
} as const satisfies Track
