import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoUnseenWorld = {
  id: "01a0b4c8-46c7-7620-9747-1755ef04c269",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-unseen-world",
  ownLength: 6.523333333333333,
  ownProgress: 6.523333333333333,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Unseen World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "unseenworld|7FQRbf8gbKw8KZQZAJWxH2|391400",
  song: "song/paul-cardall-unseen-world",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 1,
      externalId: "6FNBOe4NKxqcJPFQ4YhGor",
      externalLink: "https://open.spotify.com/track/6FNBOe4NKxqcJPFQ4YhGor",
    },
  ],
} as const satisfies Track
