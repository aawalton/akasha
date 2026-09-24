import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoAmazingGrace = {
  id: "01a0b4c8-481b-7f78-8e65-b40bddc460ee",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-amazing-grace",
  ownLength: 4.278216666666666,
  ownProgress: 4.278216666666666,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Amazing Grace",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "amazinggrace|7FQRbf8gbKw8KZQZAJWxH2|256693",
  song: "song/paul-cardall-amazing-grace",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 10,
      externalId: "2LIA0gUVq1m1B6JWoHwxnx",
      externalLink: "https://open.spotify.com/track/2LIA0gUVq1m1B6JWoHwxnx",
    },
  ],
} as const satisfies Track
