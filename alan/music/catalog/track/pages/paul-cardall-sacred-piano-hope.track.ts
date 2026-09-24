import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSacredPianoHope = {
  id: "01a0b4c8-47cc-7a64-a250-3597fddba15d",
  type: "page-type/track",
  slug: "paul-cardall-sacred-piano-hope",
  ownLength: 3.2791,
  ownProgress: 3.2791,
  partOfCollections: ["release/paul-cardall-sacred-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hope",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "hope|7FQRbf8gbKw8KZQZAJWxH2|196746",
  song: "song/paul-cardall-hope",
  carriedBy: [
    {
      release: "release/paul-cardall-sacred-piano",
      discNumber: 1,
      position: 8,
      externalId: "07RZrBOLf6pnF7AF6cpdP2",
      externalLink: "https://open.spotify.com/track/07RZrBOLf6pnF7AF6cpdP2",
    },
  ],
} as const satisfies Track
