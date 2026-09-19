import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsComingHome = {
  id: "01a0b4c8-3d86-7311-9a9b-1f81dfedfe6e",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-coming-home",
  ownLength: 2.0853333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "63xHa6HYrRwNb2zNdSJwAf",
      externalLink: "https://open.spotify.com/track/63xHa6HYrRwNb2zNdSJwAf",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Coming Home",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "cominghome|7FQRbf8gbKw8KZQZAJWxH2|125120",
  song: "song/paul-cardall-coming-home",
} as const satisfies Track
