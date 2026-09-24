import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoTime = {
  id: "01a0b4c8-4846-7041-a5d5-7c9434f25f19",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-time",
  ownLength: 3.1671,
  ownProgress: 3.1671,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "time|7FQRbf8gbKw8KZQZAJWxH2|190026",
  song: "song/paul-cardall-time",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 11,
      externalId: "4QcBhrWGLb13aawq9JqduL",
      externalLink: "https://open.spotify.com/track/4QcBhrWGLb13aawq9JqduL",
    },
  ],
} as const satisfies Track
