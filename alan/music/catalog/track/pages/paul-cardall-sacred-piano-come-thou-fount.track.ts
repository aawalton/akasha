import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoComeThouFount = {
  id: "01a0b4c8-47a5-7bf6-88d9-59719fab5a63",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-come-thou-fount",
  ownLength: 2.6208833333333335,
  ownProgress: 2.6208833333333335,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Come Thou Fount",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "comethoufount|7FQRbf8gbKw8KZQZAJWxH2|157253",
  song: "song/paul-cardall-come-thou-fount",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 7,
      externalId: "10reGqkbhWnp4mk7fS8zI0",
      externalLink: "https://open.spotify.com/track/10reGqkbhWnp4mk7fS8zI0",
    },
  ],
} as const satisfies Track
