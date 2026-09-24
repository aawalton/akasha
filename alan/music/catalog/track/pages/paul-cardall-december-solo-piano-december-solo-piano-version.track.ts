import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberSoloPianoDecemberSoloPianoVersion = {
  id: "01a0b4c8-2c53-72c6-84a5-ccb6ceae5974",
  type: "page-type/track",
  slug: "paul-cardall-december-solo-piano-december-solo-piano-version",
  ownLength: 3.0833333333333335,
  ownProgress: 3.0833333333333335,
  partOfCollections: ["release/paul-cardall-december-solo-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "December - Solo Piano Version",
  trackType: "version",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "decembersolopianoversion|7FQRbf8gbKw8KZQZAJWxH2|185000",
  song: "song/paul-cardall-december",
  carriedBy: [
    {
      release: "release/paul-cardall-december-solo-piano",
      discNumber: 1,
      position: 12,
      externalId: "3lOjTGVT3v9W4GtcDJFBRm",
      externalLink: "https://open.spotify.com/track/3lOjTGVT3v9W4GtcDJFBRm",
    },
  ],
} as const satisfies Track
