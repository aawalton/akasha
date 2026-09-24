import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSavingTinyHeartsComingHome = {
  id: "01a0b4c8-3d86-7311-9a9b-1f81dfedfe6e",
  type: "page-type/track",
  slug: "paul-cardall-saving-tiny-hearts-coming-home",
  ownLength: 2.0853333333333333,
  ownProgress: 2.0853333333333333,
  partOfCollections: ["release/paul-cardall-saving-tiny-hearts"],
  status: "completed",
  unit: "unit/minutes",
  title: "Coming Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "cominghome|7FQRbf8gbKw8KZQZAJWxH2|125120",
  song: "song/paul-cardall-coming-home",
  carriedBy: [
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 7,
      externalId: "63xHa6HYrRwNb2zNdSJwAf",
      externalLink: "https://open.spotify.com/track/63xHa6HYrRwNb2zNdSJwAf",
    },
  ],
} as const satisfies Track
